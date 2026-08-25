import { z } from "zod";

export const createApplicationSchema = z.object({
  full_name: z.string().min(1, "El nombre es requerido").max(150),
  email: z.string().email("Correo inválido"),
  phone_number: z.string().max(50).optional(),
  current_position: z.string().max(150).optional(),
  education: z.string().max(255).optional(),
  years_of_experience: z.coerce.number().int().min(0).optional(),
  expected_salary: z.string().max(100).optional(),
  availability: z.string().max(100).optional(),
  linkedin_portfolio: z.string().max(500).optional(),
  additional_comments: z.string().optional(),
});
