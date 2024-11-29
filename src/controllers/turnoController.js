import Turno from "../models/turnoModel.js";

const getAllTurnos = async (req, res) => {
  try {
    const turnos = await Turno.getAllTurnos();
    res.status(200).json(turnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTurnoById = async (req, res) => {
  try {
    const turno = await Turno.getTurnoById(req.params.id);
    res.status(200).json(turno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTurno = async (req, res) => {
  try {
    const turnoCreado = await Turno.createTurno(req.body);
    res.status(201).json(turnoCreado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTurno = async (req, res) => {
  try {
    const turnoActualizado = await Turno.updateTurno(req.params.id, req.body);
    res.status(200).json(turnoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTurno = async (req, res) => {
  try {
    const turnoEliminado = await Turno.deleteTurno(req.params.id);
    res.status(200).json(turnoEliminado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllTurnos, getTurnoById, createTurno, updateTurno, deleteTurno };
