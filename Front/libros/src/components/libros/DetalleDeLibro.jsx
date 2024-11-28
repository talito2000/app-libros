import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Divider,
  Alert,
} from "@mui/material";

const DetalleDeLibro = () => {
  const { id } = useParams(); // ID del libro desde la URL
  const [libro, setLibro] = useState({}); // Estado para los detalles del libro
  const [comentarios, setComentarios] = useState([]); // Estado para los comentarios del libro
  const [nuevoComentario, setNuevoComentario] = useState(""); // Estado para el nuevo comentario
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Obtener detalles del libro y sus comentarios
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener detalles del libro
        const libroResponse = await fetch(
          `http://localhost:3333/api/books/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("token"),
            },
          }
        );

        if (libroResponse.ok) {
          const libroData = await libroResponse.json();
          setLibro(libroData);
        } else {
          console.error("Error al obtener el libro");
        }

        // Obtener comentarios del libro
        const comentariosResponse = await fetch(
          `http://localhost:3333/api/comentarios/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("token"),
            },
          }
        );

        if (comentariosResponse.ok) {
          const comentariosData = await comentariosResponse.json();
          setComentarios(comentariosData);
        } else {
          console.error("Error al obtener los comentarios");
        }
      } catch (err) {
        console.error("Error al cargar los datos:", err);
      }
    };

    fetchData();
  }, [id]);

  // Manejar envío del nuevo comentario
  const handleAgregarComentario = async () => {
    if (!nuevoComentario.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/api/comentarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          libroId: id,
          comentario: nuevoComentario,
        }),
      });

      if (response.ok) {
        const comentarioAgregado = await response.json();
        setComentarios([...comentarios, comentarioAgregado]); // Actualiza la lista de comentarios
        setNuevoComentario(""); // Limpia el input
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error al agregar el comentario.");
      }
    } catch (error) {
      console.error("Error al agregar comentario:", error.message);
      alert("Ocurrió un error al agregar el comentario.");
    }
  };

  // Manejar favoritos
  const handleAgregarAFavoritos = async () => {
    try {
      const response = await fetch("http://localhost:3333/api/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ libroId: id }),
      });

      if (response.ok) {
        setSuccessMessage("El libro se agregó a tus favoritos.");
        setTimeout(() => setSuccessMessage(""), 3000); // Limpia el mensaje después de 3 segundos
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al agregar a favoritos.");
      }
    } catch (error) {
      console.error("Error al agregar a favoritos:", error.message);
      setError("Ocurrió un error al agregar a favoritos.");
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={3}>
          <Paper
            elevation={6}
            sx={{
              padding: 2,
              borderRadius: 4,
              boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={libro.image}
              alt={libro.title}
              style={{
                width: "100%",
                borderRadius: "8px",
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            {libro.title}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ marginBottom: 2 }}
          >
            <strong>Autor:</strong> {libro.author}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", marginBottom: 1 }}
          >
            <strong>Descripción:</strong> {libro.description}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", marginBottom: 1 }}
          >
            <strong>Sección:</strong> {libro.section}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", marginBottom: 2 }}
          >
            <strong>Año:</strong> {libro.year}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAgregarAFavoritos}
            sx={{ marginTop: 2 }}
          >
            Agregar a Favoritos
          </Button>
          {successMessage && (
            <Alert severity="success" sx={{ marginTop: 2 }}>
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {error}
            </Alert>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 6 }} />

      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Comentarios
      </Typography>
      <Box
        component="form"
        sx={{
          marginBottom: 4,
          backgroundColor: "#ffffff",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          fullWidth
          label="Escribe un comentario"
          multiline
          rows={4}
          variant="outlined"
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleAgregarComentario}
          sx={{ display: "block", marginLeft: "auto" }}
        >
          Enviar comentario
        </Button>
      </Box>

      {/* Renderizar comentarios */}
      {comentarios.map((comentario) => (
        <Box
          key={comentario._id}
          sx={{
            padding: 2,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
            marginBottom: 3,
          }}
        >
          <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
            <strong>{comentario.usuario_email}:</strong> {comentario.comentario}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", marginTop: 1 }}
          >
            {new Date(comentario.fecha).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default DetalleDeLibro;
