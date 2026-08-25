import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos" });
  }

  const user = await prisma.admin_user.findUnique({ where: { email } });

  if (!user || !user.is_active) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "8h" },
  );

  res.json({
    token,
    user: { id: user.id, email: user.email, full_name: user.full_name },
  });
}
