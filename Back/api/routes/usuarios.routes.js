import { Router } from "express";
import * as controller from "../controllers/usuarios.controllers.js";
import {
  validateLogin,
  validateUser,
} from "../../middleware/usuario.middleware.js";

const route = Router();

route.post("/usuarios", [validateUser], controller.createUser);
route.post("/usuarios/login", [validateLogin], controller.login);

export default route;
