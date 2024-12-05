import Turno from "../models/turnoModel.js";
import { validationResult } from "express-validator";

const getAllTurnos = async (req, res) => {
  try {
    const turnos = await Turno.getAllTurnos();

    if (!turnos) {
      return res.status(404).json({ error: "Turnos no encontrados" });
    }

    res.status(200).json(turnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTurnoById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Turno.findTurno({ _id: id });
    if (!response) {
      return res.status(404).json({ error: "Turno no encontrado" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createTurno = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fecha, hora, profesional } = req.body;

    const horario = hora >= "10:00" && hora <= "19:00";
    if (!horario) {
      return res
        .status(400)
        .json({ error: "El horario debe estar entre las 10:00 y las 19:00" });
    }

    const turno = await Turno.findTurno({
      fecha,
      hora,
      profesional,
      estado: "confirmado",
    });

    if (turno) {
      return res
        .status(409)
        .json({
          error: "Turno ya existente. Pruebe otra hora y/o profesional",
        });
    }
    const turnoCreado = await Turno.createTurno(req.body);
    res.status(201).json(turnoCreado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTurno = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { fecha, hora, profesional, servicio, estado } = req.body;

    const turno = await Turno.findTurno({ _id: id });
    if (!turno) {
      return res
        .status(404)
        .json({ error: "El turno que quiere actualizar no existe" });
    }

    const turnoOcupado = await Turno.findTurno({
      fecha,
      hora,
      profesional,
      estado: "confirmado",
    });

    if (turnoOcupado && turnoOcupado._id.toString() !== id) {
      return res
        .status(409)
        .json({ error: "Turno ocupado. No se puede actualizar" });
    }

    const turnoActualizado = await Turno.updateTurno(id, {
      fecha,
      hora,
      profesional,
      servicio,
      estado,
    });
    res.status(200).json(turnoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turno.findTurno({ _id: id });
    if (!turno) {
      return res.status(404).json({ error: "Turno no encontrado" });
    }
    const turnoEliminado = await Turno.deleteTurno(id);
    res.status(200).json(turnoEliminado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllTurnos, createTurno, updateTurno, deleteTurno, getTurnoById };
