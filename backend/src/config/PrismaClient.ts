import { PrismaClient } from "@prisma/client";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config();

// Initialize the database connection pool using 'pg'
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Pass the adapter to the PrismaClient constructor
export const prisma = new PrismaClient({ adapter });
