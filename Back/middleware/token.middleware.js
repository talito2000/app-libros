import * as tokenService from "../services/token.service.js";

export async function validateToken(req, res, next) {
  try {
    // Busca especificamente en el encabezado "authorization" y luego se guarda en la variable "token".
    const token = req.headers["authorization"];
    // !token -> Cubre casos como (undefined, null, "", false).
    if (!token) {
      return res.status(401).json({ message: "Token no encontrado" });
    }

    // Valida el token usando el servicio
    const usuario = await tokenService.validarToken(token);
    // Agrega el usuario al objeto req para usarlo en el controlador
    req.usuario = usuario;
    // Continúa al siguiente middleware o controlador
    next();
  } catch (error) {
    // Devuelve el mensaje de error
    res.status(401).json({ message: error.message || "Token invalido" });
  }
}
