import express from "express";
import cors from "cors";
import { router } from "./src/routes";
import dotenv from "dotenv";
import { prisma } from "./src/config/PrismaClient";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});