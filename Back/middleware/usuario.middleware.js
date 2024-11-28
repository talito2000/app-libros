// usuariosSchema y loginSchema son los esquemas creados con Yup para validar los datos de registro de usuario y login, respectivamente.
import { usuariosSchema, loginSchema } from "../schemas/usuario.validate.js";
// Usa el esquema usuariosSchema para comprobar que los datos enviados (req.body) cumplen con las reglas definidas.
// Opción abortEarly: false: Valida todos los campos antes de devolver errores (es decir, no se detiene en el primer error).
// Opción stripUnknown: true: Elimina cualquier campo en req.body que no esté definido en el esquema.
export async function validateUser(req, res, next) {
  console.log("Cuerpo recibido:", req.body);
  try {
    const datosValidos = await usuariosSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    req.body = datosValidos;
    next();
  } catch (error) {
    res.status(400).json({ message: error.errors });
  }
}

export async function validateLogin(req, res, next) {
  console.log("Datos antes de validar:", req.body);

  try {
    const datosValidos = await loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    req.body = datosValidos;
    next();
  } catch (error) {
    res.status(400).json({ message: error.errors });
  }
}
