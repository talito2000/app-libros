import * as service from "../../services/comentarios.service.js";

// Controlador para agregar un comentario
export const addComment = async (req, res) => {
  try {
    const { libroId, comentario } = req.body; // Extrae el libro y comentario del body
    const userId = req.usuario._id; // Usuario autenticado
    const userEmail = req.usuario.email; // Correo del usuario autenticado

    // Llama al servicio con el ID del usuario, el email y el comentario
    const nuevoComentario = await service.addComment(
      libroId,
      userId,
      userEmail,
      comentario
    );

    res.status(201).json(nuevoComentario); // Devuelve el comentario creado
  } catch (error) {
    console.error("Error al agregar comentario:", error.message);
    res.status(500).json({ message: "Error al agregar comentario" });
  }
};

// Controlador para obtener comentarios por ID de libro
export const getCommentsByBookId = async (req, res) => {
  try {
    const { libroId } = req.params; // Extrae el ID del libro

    // Llama al servicio para obtener comentarios por libro
    const comentarios = await service.getCommentsByBookId(libroId);

    res.status(200).json(comentarios); // Devuelve los comentarios encontrados
  } catch (error) {
    console.error("Error al obtener comentarios:", error.message);
    res.status(500).json({ message: "Error al obtener los comentarios" });
  }
};

// Controlador para eliminar un comentario
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Llamar al servicio para eliminar el comentario
    await service.deleteComment(commentId);

    res.status(200).json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar comentario:", error.message);
    res.status(500).json({ message: "Error al eliminar el comentario" });
  }
};
