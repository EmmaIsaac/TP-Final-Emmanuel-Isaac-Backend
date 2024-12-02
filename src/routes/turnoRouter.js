import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllTurnos,
  createTurno,
  updateTurno,
  deleteTurno,
  getTurnoById,
} from "../controllers/turnoController.js";

const turnoRouter = Router();

turnoRouter.use(authMiddleware);

turnoRouter.get("/", getAllTurnos);
turnoRouter.get("/:id", getTurnoById);
turnoRouter.post("/", createTurno);
turnoRouter.put("/:id", updateTurno);
turnoRouter.delete("/:id", deleteTurno);

export { turnoRouter };
