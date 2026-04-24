import { z } from "zod";

export const createPlaylistSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
  }),
});

export const addMusicToPlaylistSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
  body: z.object({
    musicId: z.number().int().positive("Music ID must be a positive integer"),
  }),
});

export const playlistIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
});
