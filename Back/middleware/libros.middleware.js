import { librosSchema } from "../schemas/libros.validate.js";

export async function validateLibro(req, res, next) {
  try {
    const datosValidados = await librosSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    req.body = datosValidados;
    next();
  } catch (error) {
    res.status(400).json({ message: error.errors });
  }
}
