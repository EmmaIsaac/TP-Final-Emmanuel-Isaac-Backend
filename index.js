import express from "express";
import helmet from "helmet";
import { connectDB } from "./src/config/mongo.js";
import { turnoRouter } from "./src/routes/turnoRouter.js";
import { userRouter } from "./src/routes/userRouter.js";
import { handlerError } from "./src/middleware/handlerError.js";

const app = express();

process.loadEnvFile();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

connectDB();

app.use("/api/turnos", turnoRouter);
app.use("/api/users", userRouter);

app.use(handlerError);

app.listen(PORT, () => {
  console.log("Servidor escuchando en http://localhost:" + PORT);
});
