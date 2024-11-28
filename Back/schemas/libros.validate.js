import yup from "yup";

export const librosSchema = yup.object({
  title: yup
    .string()
    .required("El titulo es obligatorio")
    .max(100, "El titulo no puede superar los 100 caracteres."),
  author: yup
    .string()
    .required()
    .max(30, "El autor no puede superar los 30 caracteres."),
  year: yup
    .number()
    .required()
    .positive()
    .integer()
    .min(1500, "El año tiene que ser como minimo superior al 1500.")
    .max(2024, "El año no puede ser superior al año actual."),
  section: yup
    .string()
    .required()
    .oneOf(
      ["clasicos", "ciencia ficcion", "biografias", "misterio", "novelas"],
      "La seccion debe ser una categoria valida."
    ),
  description: yup
    .string()
    .max(500, "La descripcion no puede tener mas de 500 caracteres.")
    .nullable(),
  link: yup.string().url().nullable(),
  image: yup.string().url().nullable(),
});
