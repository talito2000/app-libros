import { Router } from "express";
import * as controller from "../controllers/usuarios.controllers.js";
import {
  validateLogin,
  validateUser,
} from "../../middleware/usuario.middleware.js";
import { validateToken } from "../../middleware/token.middleware.js"; // Middleware de autenticación

const route = Router();

route.post("/usuarios", [validateUser], controller.createUser);
route.post("/usuarios/login", [validateLogin], controller.login);
route.get("/perfil", [validateToken], controller.obtenerUsuario);

export default route;
