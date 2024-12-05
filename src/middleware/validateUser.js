import { body } from "express-validator";

export const validateUser = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre de usuario debe tener al menos 3 caracteres")
    .isAlphanumeric()
    .withMessage("El nombre de usuario debe ser alfanumerico"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .withMessage(
      "La contraseña debe contener al menos una letra minúscula, una mayúscula y un número"
    ),
];
