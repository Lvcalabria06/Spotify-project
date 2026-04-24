import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { musicRoutes } from "./music.routes";
import { playlistRoutes } from "./playlist.routes";

export const router = Router();

router.use(authRoutes);
router.use(musicRoutes);
router.use(playlistRoutes);