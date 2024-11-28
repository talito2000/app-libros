import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";

const ListadoDeLibros = ({ seccion }) => {
  const navigate = useNavigate();
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para el loader

  useEffect(() => {
    setLoading(true); // Muestra el loader al inicio
    const endpoint = seccion
      ? `http://localhost:3333/api/books/section/${seccion}`
      : "http://localhost:3333/api/books";

    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLibros(data);
        setLoading(false); // Oculta el loader cuando termina
      })
      .catch((error) => {
        console.error("Error al obtener libros:", error);
        setLoading(false); // Oculta el loader incluso si hay error
      });
  }, [seccion]);

  if (loading) {
    // Mostrar el loader mientras se obtienen los libros
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={4} sx={{ padding: 2 }}>
      {libros.map((libro) => (
        <Grid item xs={12} sm={6} md={4} key={libro._id}>
          <Card
            sx={{
              maxWidth: 345,
              margin: "auto",
              boxShadow: 3,
              borderRadius: 2,
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="335"
              image={libro.image}
              alt={libro.title}
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {libro.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Autor:</strong> {libro.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Año:</strong> {libro.year}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Sección:</strong> {libro.section}
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate(`/books/${libro._id}`)}
              sx={{ borderRadius: 0 }}
            >
              Ver detalle
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListadoDeLibros;
