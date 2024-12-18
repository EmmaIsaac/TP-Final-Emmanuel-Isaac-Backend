import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema(
  {
    fecha: {
      type: String, // Formato ISO 8601 (YYYY-MM-DD)
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    hora: {
      type: String, // Formato HH:mm
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    profesional: {
      type: String,
      required: true, // Campo obligatorio

      enum: ["Juan Pérez", "María López", "Carlos Sánchez"], // Opciones permitidas para el profesional
      trim: true,
    },
    servicio: {
      type: String,
      required: true,
      enum: [
        "Corte de pelo",
        "Corte de barba",
        "Corte de pelo y barba",
        "Tintura",
      ],
      trim: true,
    },
    cliente: {
      nombre: {
        type: String,
        required: true,
        trim: true,
      },
      numeroContacto: {
        type: String,
        required: true,
        trim: true,
      },
    },
    estado: {
      type: String,
      default: "confirmado", // Valor por defecto
      enum: ["confirmado", "realizado"], // Opciones válidas para el estado. Si se Cancela, se elimina el turno
    },
  },
  { versionKey: false } // Esto deshabilita el campo __v
);

const Turno = mongoose.model("turno", turnoSchema);

const getAllTurnos = async () => {
  try {
    const turnos = await Turno.find();
    return turnos;
  } catch (error) {
    throw new Error("Error al obtener los turnos");
  }
};

const findTurno = async (dataTurno) => {
  try {
    const turno = await Turno.findOne(dataTurno);
    return turno;
  } catch (error) {
    throw new Error("El Turno no pudo ser encontrado");
  }
};

const createTurno = async (dataTurno) => {
  try {
    const turnoCreado = new Turno(dataTurno);
    await turnoCreado.save();
    return turnoCreado;
  } catch (error) {
    throw new Error("Error al crear el turno");
  }
};

const updateTurno = async (id, dataTurno) => {
  try {
    const turnoActualizado = await Turno.findByIdAndUpdate(id, dataTurno, {
      new: true,
    });
    return turnoActualizado;
  } catch (error) {
    throw new Error("Error al actualizar el turno");
  }
};

const deleteTurno = async (id) => {
  try {
    const turnoEliminado = await Turno.deleteOne({ _id: id });
    return turnoEliminado;
  } catch (error) {
    throw new Error("Error al eliminar el turno");
  }
};

export default {
  getAllTurnos,
  findTurno,
  createTurno,
  updateTurno,
  deleteTurno,
};
