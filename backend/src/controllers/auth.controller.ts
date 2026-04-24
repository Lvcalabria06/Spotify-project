import { Request, Response } from "express";
import { prisma } from "../config/PrismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = "123";

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hash },
  });

  res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(401).json({ message: "Invalid password" });

  const { password: _, ...userWithoutPassword } = user;

  const token = jwt.sign(userWithoutPassword, SECRET, {
    expiresIn: "3000m",
  });

  res.json({ token });
}
