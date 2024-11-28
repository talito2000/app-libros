import { Router } from "express";
import * as comentarioController from "../controllers/comentarios.controllers.js";
import { validateToken } from "../../middleware/token.middleware.js";

const router = Router();

router.post("/comentarios", [validateToken], comentarioController.addComment);
router.get("/comentarios/:libroId", comentarioController.getCommentsByBookId);
router.delete(
  "/comentarios/:commentId",
  validateToken,
  comentarioController.deleteComment
);

export default router;
