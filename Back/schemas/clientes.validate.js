import yup from "yup";

export const clientesSchema = yup.object({
  nombre: yup
    .string()
    .max(20, "El nombre no puede tener mas de 20 caracteres.")
    .required("El nombre es obligatorio."),
  foto: yup.string().url().nullable(),
  descripcion: yup
    .string()
    .max(500, "La descripcion puede tener como maximo 500 caracteres.")
    .required("La descripcion es obligatoria."),
  libros: yup
    .array(yup.string().required("El ID del libro es obligatorio."))
    .min(1, "El cliente debe tener al menos un libro.")
    .required("El campo libros es obligatorio."),
});
