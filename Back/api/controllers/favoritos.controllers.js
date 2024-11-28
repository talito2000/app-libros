import * as favoritoService from "../../services/favoritos.service.js";

export const agregarFavorito = async (req, res) => {
  const { libroId } = req.body; // ID del libro desde el cuerpo de la solicitud
  const userId = req.usuario._id; // ID del usuario autenticado

  try {
    await favoritoService.agregarFavorito(userId, libroId);
    res.status(201).json({ message: "Libro agregado a favoritos." });
  } catch (error) {
    console.error("Error al agregar favorito:", error.message);
    res.status(500).json({ message: "Error al agregar a favoritos." });
  }
};

export const obtenerFavoritos = async (req, res) => {
  const userId = req.usuario._id; // ID del usuario autenticado

  try {
    const favoritos = await favoritoService.obtenerFavoritosPorUsuario(userId);
    res.status(200).json(favoritos);
  } catch (error) {
    console.error("Error al obtener favoritos:", error.message);
    res.status(500).json({ message: "Error al obtener favoritos." });
  }
};
