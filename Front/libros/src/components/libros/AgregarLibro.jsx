import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AgregarLibro = () => {
  const navigate = useNavigate(); // Hook para navegar a otras rutas
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado para el loader
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    section: "",
    link: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mostrar loader al enviar formulario

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        setError("Token no disponible. Inicia sesión nuevamente.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:3333/api/books/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Ocurrió un error.");
        setLoading(false);
        return;
      }

      setError("");
      setLoading(false);
      navigate("/confirmacion-libro"); // Redirige a una página de confirmación
    } catch (err) {
      setError("Error al conectar con el servidor.");
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 500,
        margin: "50px auto", // Añadimos margen superior para separar del navbar
        backgroundColor: "#ffffff",
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Typography variant="h5" gutterBottom textAlign="center">
        Agregar Libro
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
        >
          <CircularProgress />
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Título */}
          <Grid item xs={12}>
            <TextField
              label="Título"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              size="small"
            />
          </Grid>

          {/* Autor */}
          <Grid item xs={12}>
            <TextField
              label="Autor"
              name="author"
              value={formData.author}
              onChange={handleChange}
              fullWidth
              required
              size="small"
            />
          </Grid>

          {/* Año */}
          <Grid item xs={12}>
            <TextField
              label="Año de publicación"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              fullWidth
              required
              size="small"
            />
          </Grid>

          {/* Sección */}
          <Grid item xs={12}>
            <FormControl fullWidth required size="small">
              <InputLabel id="section-label">Sección</InputLabel>
              <Select
                labelId="section-label"
                name="section"
                value={formData.section}
                onChange={handleChange}
              >
                <MenuItem value="novelas">Novelas</MenuItem>
                <MenuItem value="misterio">Misterio</MenuItem>
                <MenuItem value="ciencia ficcion">Ciencia ficción</MenuItem>
                <MenuItem value="clasicos">Clásicos</MenuItem>
                <MenuItem value="biografias">Biografías</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Enlace */}
          <Grid item xs={12}>
            <TextField
              label="Enlace (Link)"
              name="link"
              value={formData.link}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>

          {/* Imagen */}
          <Grid item xs={12}>
            <TextField
              label="Imagen (URL)"
              name="image"
              value={formData.image}
              onChange={handleChange}
              fullWidth
              required
              size="small"
            />
          </Grid>

          {/* Descripción */}
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              required
              size="small"
            />
          </Grid>

          {/* Botón */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading} // Desactivar botón si está cargando
            >
              {loading ? "Agregando..." : "Agregar Libro"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AgregarLibro;
