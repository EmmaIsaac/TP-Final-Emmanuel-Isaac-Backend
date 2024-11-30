import { Router } from "express";
import {
  getAllTurnos,
  createTurno,
  updateTurno,
  deleteTurno,
  getTurnoByProfesional,
} from "../controllers/turnoController.js";

const turnoRouter = Router();

turnoRouter.get("/", getAllTurnos);
turnoRouter.get("/profesional/:profesional", getTurnoByProfesional);
turnoRouter.post("/", createTurno);
turnoRouter.patch("/:id", updateTurno);
turnoRouter.delete("/:id", deleteTurno);

export { turnoRouter };
