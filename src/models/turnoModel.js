import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema({
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
    enum: ["Juan Pérez", "María López", "Carlos Sánchez", "Sin preferencia"], // Opciones permitidas para el profesional
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
    enum: ["confirmado", "realizado", "cancelado"], // Opciones válidas para el estado
  },
});

const Turno = mongoose.model("turno", turnoSchema);

const getAllTurnos = async () => {
  try {
    const turnos = await Turno.find();
    return turnos;
  } catch (error) {
    console.log(error);
  }
};

const createTurno = async (dataTurno) => {
  try {
    const turnoCreado = new Turno(dataTurno);
    await turnoCreado.save();
    return turnoCreado;
  } catch (error) {
    console.log(error);
  }
};

export default { getAllTurnos, createTurno };
