import express from "express";
import { connectDB } from "./src/config/mongo.js";

const app = express();

process.loadEnvFile();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.listen(PORT, () => {
  console.log("Servidor escuchando en http://localhost:" + PORT);
});
