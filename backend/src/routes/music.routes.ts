import { Router } from "express";
import { getMusics } from "../controllers/music.controller";

export const musicRoutes = Router();

musicRoutes.get("/musics", getMusics);