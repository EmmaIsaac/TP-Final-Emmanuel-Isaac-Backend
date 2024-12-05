import { body } from "express-validator";

export const validateCreate = [
  // Validar fecha en formato ISO 8601
  body("fecha")
    .isString()
    .withMessage("La fecha debe ser un texto")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("La fecha debe estar en formato YYYY-MM-DD")
    .notEmpty()
    .withMessage("La fecha es obligatoria"),

  // Validar hora en formato HH:mm
  body("hora")
    .isString()
    .withMessage("La hora debe ser un texto")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("La hora debe estar en formato HH:mm")
    .notEmpty()
    .withMessage("La hora es obligatoria"),

  // Validar profesional
  body("profesional")
    .isString()
    .withMessage("El profesional debe ser un texto")
    .isIn(["Juan Pérez", "María López", "Carlos Sánchez"])
    .withMessage("El profesional debe ser una opción válida")
    .notEmpty()
    .withMessage("El profesional es obligatorio"),
  // Validar servicio
  body("servicio")
    .isString()
    .withMessage("El servicio debe ser un texto")
    .isIn([
      "Corte de pelo",
      "Corte de barba",
      "Corte de pelo y barba",
      "Tintura",
    ])
    .withMessage("El servicio debe ser una opción válida")
    .notEmpty()
    .withMessage("El servicio es obligatorio"),

  // Validar cliente.nombre
  body("cliente.nombre")
    .isString()
    .withMessage("El nombre del cliente debe ser un texto")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),

  // Validar cliente.numeroContacto
  body("cliente.numeroContacto")
    .isString()
    .withMessage("El número de contacto debe ser un texto")
    .notEmpty()
    .withMessage("El número de contacto es obligatorio"),

  // Validar estado
  body("estado")
    .isString()
    .withMessage("El estado debe ser un texto")
    .isIn(["confirmado", "realizado"])
    .withMessage("El estado debe ser confirmado o realizado")
    .optional({ nullable: true })
    .default("confirmado"),
];
