import { Router } from "express";
import {
  getAllTurnos,
  createTurno,
  updateTurno,
  deleteTurno,
  getTurnoById,
} from "../controllers/turnoController.js";

const turnoRouter = Router();

turnoRouter.get("/", getAllTurnos);
turnoRouter.get("/:id", getTurnoById);
turnoRouter.post("/", createTurno);
turnoRouter.patch("/:id", updateTurno);
turnoRouter.delete("/:id", deleteTurno);

export { turnoRouter };
