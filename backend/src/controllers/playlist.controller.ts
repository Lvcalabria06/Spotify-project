import { Request, Response } from "express";
import { prisma } from "../config/PrismaClient";


export async function createPlaylist(req: Request, res: Response) {
  const { name } = req.body;
  const userId = (req as any).user.id;

  const playlist = await prisma.playlist.create({
    data: { name, userId },
  });

  res.status(201).json(playlist);
}

export async function getPlaylists(req: Request, res: Response) {
  const userId = (req as any).user.id;

  const playlists = await prisma.playlist.findMany({
    where: { userId },
  });

  res.json(playlists);
}

export async function getPlaylistById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const userId = (req as any).user.id;

  const playlist = await prisma.playlist.findUnique({
    where: { id },
    include: { musics: true },
  });

  if (!playlist) return res.status(404).json({ message: "Playlist not found" });
  if (playlist.userId !== userId) return res.status(403).json({ message: "Forbidden" });

  res.json(playlist);
}

export async function deletePlaylist(req: Request, res: Response) {
  const id = Number(req.params.id);
  const userId = (req as any).user.id;

  const playlist = await prisma.playlist.findUnique({
    where: { id },
  });

  if (!playlist) return res.status(404).json({ message: "Playlist not found" });
  if (playlist.userId !== userId) {
    return res.status(403).json({ message: "You can only delete your own playlists" });
  }

  await prisma.playlist.delete({ where: { id } });

  res.status(204).send();
}

export async function addMusic(req: Request, res: Response) {
  const playlistId = Number(req.params.id);
  const { musicId } = req.body;
  const userId = (req as any).user.id;

  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
  });

  if (!playlist) return res.status(404).json({ message: "Playlist not found" });
  if (playlist.userId !== userId) {
    return res.status(403).json({ message: "You can only add music to your own playlists" });
  }

  const music = await prisma.music.findUnique({
    where: { id: musicId },
  });

  if (!music) {
    return res.status(404).json({ message: "Music not found" });
  }

  // Check for duplication
  const existingRelation = await prisma.playlistMusic.findFirst({
    where: { playlistId, musicId },
  });

  if (existingRelation) {
    return res.status(400).json({ message: "Music already in playlist" });
  }

  const relation = await prisma.playlistMusic.create({
    data: { playlistId, musicId },
  });

  res.status(201).json(relation);
}

export async function removeMusic(req: Request, res: Response) {
  const playlistId = Number(req.params.id);
  const musicId = Number(req.params.musicId);
  const userId = (req as any).user.id;

  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
  });

  if (!playlist) return res.status(404).json({ message: "Playlist not found" });
  if (playlist.userId !== userId) {
    return res.status(403).json({ message: "You can only remove music from your own playlists" });
  }

  await prisma.playlistMusic.deleteMany({
    where: { playlistId, musicId },
  });

  res.status(204).send();
}