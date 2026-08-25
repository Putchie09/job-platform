import { Request, Response } from "express";
import prisma from "../../config/prisma";

export async function getLocations(_req: Request, res: Response) {
  const locations = await prisma.location.findMany({
    where: { is_active: true },
  });
  res.json(locations);
}

export async function getDepartments(_req: Request, res: Response) {
  const departments = await prisma.department.findMany({
    where: { is_active: true },
  });
  res.json(departments);
}

export async function getModalities(_req: Request, res: Response) {
  const modalities = await prisma.modality.findMany({
    where: { is_active: true },
  });
  res.json(modalities);
}

export async function getEmploymentTypes(_req: Request, res: Response) {
  const employmentTypes = await prisma.employment_type.findMany({
    where: { is_active: true },
  });
  res.json(employmentTypes);
}
