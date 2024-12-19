import * as favoritoService from "../../services/favoritos.service.js";

export const agregarFavorito = async (req, res) => {
  const { libroId } = req.body; // ID del libro desde el cuerpo de la solicitud
  const userId = req.usuario._id; // ID del usuario autenticado

  try {
    await favoritoService.agregarFavorito(userId, libroId);
    res.status(201).json({ message: "Libro agregado a favoritos." });
  } catch (error) {
    console.error("Error al agregar favorito:", error.message);

    if (error.message === "Este libro ya está en tus favoritos.") {
      // Si el error es específico de duplicados
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error al agregar a favoritos." });
    }
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

export const eliminarFavorito = async (req, res) => {
  const { libroId } = req.params; // Libro ID desde la URL
  const userId = req.usuario._id; // Usuario autenticado

  try {
    const resultado = await favoritoService.eliminarFavorito(userId, libroId);
    if (resultado.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "El libro no está en tus favoritos." });
    }
    res.status(200).json({ message: "Libro eliminado de favoritos." });
  } catch (error) {
    console.error("Error al eliminar favorito:", error.message);
    res.status(500).json({ message: "Error al eliminar favorito." });
  }
};
