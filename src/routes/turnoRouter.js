import { Router } from "express";
import {
  getAllTurnos,
  getTurnoById,
  createTurno,
  updateTurno,
  deleteTurno,
} from "../controllers/turnoController.js";

const turnoRouter = Router();

turnoRouter.get("/", getAllTurnos);
turnoRouter.get("/:id", getTurnoById);
turnoRouter.post("/", createTurno);
turnoRouter.patch("/:id", updateTurno);
turnoRouter.delete("/:id", deleteTurno);

export { turnoRouter };
