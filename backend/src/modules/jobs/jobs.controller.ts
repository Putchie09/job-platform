import { Request, Response } from "express";
import prisma from "../../config/prisma";
import { AuthRequest } from "../../middleware/auth.middleware";

const jobPublicSelect = {
  id: true,
  title: true,
  description: true,
  responsibilities: true,
  requirements: true,
  salary: true,
  positions_available: true,
  additional_info: true,
  created_at: true,
  updated_at: true,
  location: { select: { name: true } },
  department: { select: { name: true } },
  modality: { select: { name: true } },
  employment_type: { select: { name: true } },
};

export async function getJobs(req: Request, res: Response) {
  const { location_id, department_id } = req.query;

  const jobs = await prisma.job.findMany({
    where: {
      is_active: true,
      location_id: location_id ? Number(location_id) : undefined,
      department_id: department_id ? Number(department_id) : undefined,
    },
    select: jobPublicSelect,
    orderBy: { created_at: "desc" },
  });

  res.json(jobs);
}

export async function getJobById(req: Request, res: Response) {
  const { id } = req.params;

  const job = await prisma.job.findFirst({
    where: { id: Number(id), is_active: true },
    select: jobPublicSelect,
  });

  if (!job) {
    return res.status(404).json({ message: "Vacante no encontrada" });
  }

  res.json(job);
}




// #############################
// Admin section
// #############################




export async function getAdminJobs(_req: Request, res: Response) {
  const jobs = await prisma.job.findMany({
    include: {
      location: true,
      department: true,
      modality: true,
      employment_type: true,
    },
    orderBy: { created_at: "desc" },
  });
  res.json(jobs);
}

export async function createJob(req: AuthRequest, res: Response) {
  const {
    title,
    description,
    responsibilities,
    requirements,
    salary,
    positions_available,
    additional_info,
    location_id,
    department_id,
    modality_id,
    employment_type_id,
  } = req.body;

  const job = await prisma.job.create({
    data: {
      title,
      description,
      responsibilities,
      requirements,
      salary,
      positions_available,
      additional_info,
      location_id,
      department_id,
      modality_id,
      employment_type_id,
      created_by: req.user!.sub,
    },
  });

  res.status(201).json(job);
}

export async function updateJob(req: Request, res: Response) {
  const { id } = req.params;
  const {
    title,
    description,
    responsibilities,
    requirements,
    salary,
    positions_available,
    additional_info,
    location_id,
    department_id,
    modality_id,
    employment_type_id,
  } = req.body;

  const job = await prisma.job.update({
    where: { id: Number(id) },
    data: {
      title,
      description,
      responsibilities,
      requirements,
      salary,
      positions_available,
      additional_info,
      location_id,
      department_id,
      modality_id,
      employment_type_id,
      updated_at: new Date(),
    },
  });

  res.json(job);
}

export async function deactivateJob(req: Request, res: Response) {
  const { id } = req.params;

  const job = await prisma.job.update({
    where: { id: Number(id) },
    data: { is_active: false, updated_at: new Date() },
  });

  res.json(job);
}