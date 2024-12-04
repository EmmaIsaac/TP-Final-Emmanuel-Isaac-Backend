import { body } from "express-validator";

export const validateUpdate = [
  // Validar fecha en formato ISO 8601 (opcional)
  body("fecha")
    .optional()
    .isString()
    .withMessage("La fecha debe ser un texto")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("La fecha debe estar en formato YYYY-MM-DD"),

  // Validar hora en formato HH:mm (opcional)
  body("hora")
    .optional()
    .isString()
    .withMessage("La hora debe ser un texto")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("La hora debe estar en formato HH:mm"),

  // Validar profesional (opcional)
  body("profesional")
    .optional()
    .isString()
    .withMessage("El profesional debe ser un texto")
    .isIn(["Juan Pérez", "María López", "Carlos Sánchez", "Sin preferencia"])
    .withMessage("El profesional debe ser una opción válida"),

  // Validar servicio (opcional)
  body("servicio")
    .optional()
    .isString()
    .withMessage("El servicio debe ser un texto")
    .isIn([
      "Corte de pelo",
      "Corte de barba",
      "Corte de pelo y barba",
      "Tintura",
    ])
    .withMessage("El servicio debe ser una opción válida"),

  // Validar estado (opcional)
  body("estado")
    .optional()
    .isString()
    .withMessage("El estado debe ser un texto")
    .isIn(["confirmado", "realizado"])
    .withMessage("El estado debe ser confirmado o realizado"),
];
