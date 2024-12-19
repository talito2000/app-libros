import * as service from "../../services/usuario.service.js";

export function createUser(req, res) {
  const { nombre, email, password, passwordConfirm } = req.body;

  // Validamos que todos los campos requeridos estén presentes
  if (!nombre || !email || !password || !passwordConfirm) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  // Validamos que las contraseñas coincidan
  if (password !== passwordConfirm) {
    return res.status(400).json({ message: "Las contraseñas no coinciden." });
  }

  // Llamamos al servicio para crear el usuario
  service
    .crearUsuario({ nombre, email, password })
    .then((usuario) => res.status(201).json(usuario))
    .catch((error) =>
      res
        .status(400)
        .json({ message: error.message || "No se pudo crear el usuario." })
    );
}

export function login(req, res) {
  service
    .login(req.body)
    .then((usuario) => res.status(200).json(usuario))
    .catch((error) =>
      res
        .status(400)
        .json({ message: error.message || "No se pudo iniciar sesion" })
    );
}

export const obtenerUsuario = async (req, res) => {
  const userId = req.usuario._id; // Usuario autenticado

  try {
    const usuario = await service.obtenerUsuarioPorId(userId);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario:", error.message);
    res.status(500).json({ message: "Error al obtener el usuario." });
  }
};
