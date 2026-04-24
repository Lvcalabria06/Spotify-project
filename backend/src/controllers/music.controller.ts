import { Request, Response } from "express";
import { prisma } from "../config/PrismaClient";

export async function getMusics(req: Request, res: Response) {
  const musics = await prisma.music.findMany();
  res.json(musics);
}