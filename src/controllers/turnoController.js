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
      estado: "confirmado", //REVIZAR si estado si o estado no
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
    const { dia, hora, profesional } = req.body;
    if (!estado) {
      return res.status(400).json({ error: "El estado es obligatorio" });
    }
    const turno = await Turno.findTurno({ _id: id }); //tambien verificar si no colociona con otro existente
    if (!turno) {
      return res.status(404).json({ error: "Turno no encontrado" });
    }

    const turnoExisting = await Turno.findTurno({
      fecha,
      hora,
      profesional,
    });

    if (turnoExisting) {
      return res.status(409).json({ error: "Turno ya existente" });
    }

    const turnoActualizado = await Turno.updateTurno(id, {
      dia,
      hora,
      profesional,
    }); //Mejor modificar el dia+hora+profesional
    res.status(200).json(turnoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Se borran los turnos cancelados. Y los realizados?
const deleteTurno = async (req, res) => {
  try {
    const turno = await Turno.findTurno({ _id: req.params.id });
    if (!turno) {
      return res.status(404).json({ error: "Turno no encontrado" });
    }
    const turnoEliminado = await Turno.deleteTurno(req.params.id);
    res.status(200).json(turnoEliminado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllTurnos, createTurno, updateTurno, deleteTurno, getTurnoById };
