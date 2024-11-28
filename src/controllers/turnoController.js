import Turno from "../models/turnoModel.js";

const getAllTurnos = async (req, res) => {
  try {
    const turnos = await Turno.getAllTurnos();
    res.json(turnos);
  } catch (error) {
    console.log(error);
  }
};

const createTurno = async (req, res) => {
  try {
    const turnoCreado = await Turno.createTurno(req.body);
    res.json(turnoCreado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllTurnos, createTurno };
