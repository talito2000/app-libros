import yup from "yup";

export const usuariosSchema = yup.object({
  email: yup
    .string()
    .email("Debe ser un email válido.")
    .required("El email es obligatorio."),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(16, "La contraseña no puede tener más de 16 caracteres.")
    .required("La contraseña es obligatoria.")
    .matches(/[0-9]/, "La contraseña debe tener al menos un número.")
    .matches(/[A-Z]/, "La contraseña debe tener al menos una mayúscula.")
    .matches(
      /^[^@?%&#]*$/,
      "La contraseña no debe tener caracteres especiales como: @, ?, %, &, #."
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir.")
    .required("La confirmación de la contraseña es obligatoria."),
  age: yup
    .number()
    .integer("La edad debe ser un número entero.")
    .min(18, "Debes tener al menos 18 años."),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Debe ser un email válido")
    .required("El email es obligatorio"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
});
