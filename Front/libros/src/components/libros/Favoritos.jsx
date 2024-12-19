import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Alert,
} from "@mui/material";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  // Obtener favoritos al cargar el componente
  useEffect(() => {
    fetch("http://localhost:3333/api/favoritos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setFavoritos(data))
      .catch((err) => console.error("Error al obtener favoritos:", err));
  }, []);

  // Manejar la eliminación de un favorito
  const handleEliminarFavorito = async (libroId) => {
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `http://localhost:3333/api/favoritos/${libroId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFavoritos(favoritos.filter((fav) => fav.libro._id !== libroId)); // Actualiza la lista
        setSuccessMessage("El libro fue eliminado de tus favoritos.");
      } else {
        setError(data.message || "Error al eliminar de favoritos.");
      }
    } catch (error) {
      console.error("Error al eliminar favorito:", error.message);
      setError("Ocurrió un error al eliminar de favoritos.");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Favoritos
      </Typography>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={4}>
        {favoritos.map((favorito) => (
          <Grid item xs={12} sm={6} md={4} key={favorito.libro._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={favorito.libro.image}
                alt={favorito.libro.title}
              />
              <CardContent>
                <Typography variant="h6">{favorito.libro.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {favorito.libro.author}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleEliminarFavorito(favorito.libro._id)}
                  sx={{ marginTop: 2 }}
                >
                  Eliminar de Favoritos
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Favoritos;
