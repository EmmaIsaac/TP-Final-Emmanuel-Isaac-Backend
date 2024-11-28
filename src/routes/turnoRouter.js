import { Router } from "express";
import { getAllTurnos, createTurno } from "../controllers/turnoController.js";

const turnoRouter = Router();

turnoRouter.get("/", getAllTurnos);
// turnoRouter.get("/:id", getTurnoById);
turnoRouter.post("/", createTurno);
// turnoRouter.put("/:id", updateTurno);
// turnoRouter.delete("/:id", deleteTurno);

export { turnoRouter };
