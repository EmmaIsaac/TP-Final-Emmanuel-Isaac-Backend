import Turno from "../models/turnoModel.js";

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
    const {
      fecha,
      hora,
      profesional,
      servicio,
      cliente: { nombre, numeroContacto },
    } = req.body;

    if (
      !fecha ||
      !hora ||
      !profesional ||
      !servicio ||
      !nombre ||
      !numeroContacto
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const turno = await Turno.findTurno({
      fecha,
      hora,
      profesional,
      estado: "confirmado",
    });

    if (turno) {
      return res.status(409).json({ error: "Turno ya existente" });
    }
    const turnoCreado = await Turno.createTurno(req.body);
    res.status(201).json(turnoCreado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTurno = async (req, res) => {
  try {
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

//Se borran los turnos cancelados. Y los realizados?
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
