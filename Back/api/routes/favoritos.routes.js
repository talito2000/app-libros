import { Router } from "express";
import * as favoritosController from "../controllers/favoritos.controllers.js";
import { validateToken } from "../../middleware/token.middleware.js"; // Middleware de autenticación

const router = Router();

// Rutas para favoritos
router.post("/favoritos", validateToken, favoritosController.agregarFavorito);
router.get("/favoritos", validateToken, favoritosController.obtenerFavoritos);
router.delete(
  "/favoritos/:libroId",
  validateToken,
  favoritosController.eliminarFavorito
);
export default router;
