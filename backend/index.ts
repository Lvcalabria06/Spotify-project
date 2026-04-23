import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";



const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 🚀');
  console.log('👉 Acesse: http://localhost:3000');
});