import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, Alert } from "@mui/material";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/perfil", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsuario(data);
        } else {
          const errorData = await response.json();
          setError(
            errorData.message || "Error al cargar los datos del usuario."
          );
        }
      } catch (err) {
        setError("Error al conectar con el servidor.");
      }
    };

    fetchUsuario();
  }, []);

  if (error) {
    return (
      <Box sx={{ padding: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!usuario) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6">Cargando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Perfil de Usuario
      </Typography>
      <Paper
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Nombre: {usuario.nombre}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Email: {usuario.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Fecha de Registro:{" "}
              {new Date(usuario.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Perfil;
