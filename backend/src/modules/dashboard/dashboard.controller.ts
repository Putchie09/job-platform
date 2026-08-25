import { Request, Response } from "express";
import prisma from "../../config/prisma";

export async function getDashboardStats(_req: Request, res: Response) {
  const [activeJobs, totalJobs, totalApplications, applicationsByStatus] =
    await Promise.all([
      prisma.job.count({ where: { is_active: true } }),
      prisma.job.count(),
      prisma.application.count(),
      prisma.application_status.findMany({
        select: {
          id: true,
          name: true,
          _count: { select: { application: true } },
        },
      }),
    ]);

  res.json({
    active_jobs: activeJobs,
    total_jobs: totalJobs,
    total_applications: totalApplications,
    applications_by_status: applicationsByStatus.map((s) => ({
      status_id: s.id,
      status_name: s.name,
      count: s._count.application,
    })),
  });
}
