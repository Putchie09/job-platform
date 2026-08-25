import { Request, Response } from "express";
import prisma from "../../config/prisma";
import { createApplicationSchema } from "./applications.schema";
import { AuthRequest } from "../../middleware/auth.middleware";
import { queueEmail } from "../notifications/notifications.service";

export async function createApplication(req: Request, res: Response) {
  const jobId = Number(req.params.jobId);

  const job = await prisma.job.findFirst({
    where: { id: jobId, is_active: true },
  });

  if (!job) {
    return res.status(404).json({ message: "Vacante no encontrada" });
  }

  const parsed = createApplicationSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }

  const enviadoStatus = await prisma.application_status.findUnique({
    where: { name: "Enviado" },
  });

  if (!enviadoStatus) {
    return res.status(500).json({ message: "Estado inicial no configurado" });
  }

  const resumeUrl = req.file ? `/uploads/resumes/${req.file.filename}` : null;

  const application = await prisma.application.create({
    data: {
      job_id: jobId,
      status_id: enviadoStatus.id,
      resume_url: resumeUrl,
      ...parsed.data,
    },
  });

  await queueEmail({
    application_id: application.id,
    recipient: application.email,
    subject: "Confirmación de postulación recibida",
    body: `<p>Hola ${application.full_name},</p><p>Hemos recibido tu postulación correctamente. Te contactaremos si tu perfil avanza en el proceso.</p>`,
  });

  res.status(201).json({
    message: "Postulación recibida correctamente",
    application_id: application.id,
  });
}




// #########################
// Admin
// #########################




export async function getApplications(req: Request, res: Response) {
  const { job_id, status_id } = req.query;

  const applications = await prisma.application.findMany({
    where: {
      job_id: job_id ? Number(job_id) : undefined,
      status_id: status_id ? Number(status_id) : undefined,
    },
    include: {
      job: { select: { title: true } },
      application_status: { select: { id: true, name: true } },
    },
    orderBy: { created_at: "desc" },
  });

  res.json(applications);
}

export async function getApplicationById(req: Request, res: Response) {
  const { id } = req.params;

  const application = await prisma.application.findUnique({
    where: { id: Number(id) },
    include: {
      job: { select: { title: true } },
      application_status: { select: { id: true, name: true } },
      application_status_history: {
        include: {
          application_status: { select: { name: true } },
          admin_user: { select: { full_name: true } },
        },
        orderBy: { changed_at: "asc" },
      },
    },
  });

  if (!application) {
    return res.status(404).json({ message: "Postulación no encontrada" });
  }

  res.json(application);
}

export async function updateApplicationStatus(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { status_id } = req.body;

  if (!status_id) {
    return res.status(400).json({ message: "status_id es requerido" });
  }

  const application = await prisma.application.findUnique({
    where: { id: Number(id) },
  });

  if (!application) {
    return res.status(404).json({ message: "Postulación no encontrada" });
  }

  const newStatus = await prisma.application_status.findUnique({
    where: { id: Number(status_id) },
  });

  const [updated] = await prisma.$transaction([
    prisma.application.update({
      where: { id: Number(id) },
      data: { status_id: Number(status_id) },
    }),
    prisma.application_status_history.create({
      data: {
        application_id: Number(id),
        status_id: Number(status_id),
        changed_by: req.user!.sub,
      },
    }),
  ]);

  await queueEmail({
    application_id: updated.id,
    recipient: updated.email,
    subject: `Actualización de tu postulación: ${newStatus?.name}`,
    body: `<p>Hola ${updated.full_name},</p><p>El estado de tu postulación ha cambiado a: <strong>${newStatus?.name}</strong>.</p>`,
  });

  res.json(updated);
}





// ################
// CVs
// ################

import path from "path";

export async function downloadResume(req: Request, res: Response) {
  const { id } = req.params;

  const application = await prisma.application.findUnique({
    where: { id: Number(id) },
  });

  if (!application || !application.resume_url) {
    return res.status(404).json({ message: "Currículum no encontrado" });
  }

  const filename = path.basename(application.resume_url);
  const filePath = path.join(__dirname, "../../../uploads/resumes", filename);

  res.download(filePath);
}


