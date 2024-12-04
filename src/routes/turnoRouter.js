import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllTurnos,
  createTurno,
  updateTurno,
  deleteTurno,
  getTurnoById,
} from "../controllers/turnoController.js";
import { validateCreate } from "../middleware/validateCreate.js";
import { validateUpdate } from "../middleware/validateUpdate.js";

const turnoRouter = Router();

turnoRouter.use(authMiddleware);

turnoRouter.get("/", getAllTurnos);
turnoRouter.get("/:id", getTurnoById);
turnoRouter.post("/", validateCreate, createTurno);
turnoRouter.put("/:id", validateUpdate, updateTurno);
turnoRouter.delete("/:id", deleteTurno);

export { turnoRouter };
