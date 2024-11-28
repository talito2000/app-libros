import { clientesSchema } from "../schemas/clientes.validate.js";

export async function validateCliente(req, res, next) {
  try {
    const datosValidados = await clientesSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    req.body = datosValidados;
    next();
  } catch (error) {
    res.status(400).json({ message: error.errors });
  }
}
