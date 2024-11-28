import * as service from "../../services/usuario.service.js";

export function createUser(req, res) {
  service
    .crearUsuario(req.body)
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
