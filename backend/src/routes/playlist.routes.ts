import { Router } from "express";
import {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  deletePlaylist,
  addMusic,
  removeMusic,
} from "../controllers/playlist.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createPlaylistSchema,
  addMusicToPlaylistSchema,
  playlistIdSchema,
} from "../schemas/playlist.schema";

export const playlistRoutes = Router();

playlistRoutes.post(
  "/playlists",
  authMiddleware,
  validate(createPlaylistSchema),
  createPlaylist
);
playlistRoutes.get("/playlists", authMiddleware, getPlaylists);
playlistRoutes.get(
  "/playlists/:id",
  authMiddleware,
  validate(playlistIdSchema),
  getPlaylistById
);
playlistRoutes.delete(
  "/playlists/:id",
  authMiddleware,
  validate(playlistIdSchema),
  deletePlaylist
);

playlistRoutes.post(
  "/playlists/:id/musics",
  authMiddleware,
  validate(addMusicToPlaylistSchema),
  addMusic
);
playlistRoutes.delete(
  "/playlists/:id/musics/:musicId",
  authMiddleware,
  removeMusic
);