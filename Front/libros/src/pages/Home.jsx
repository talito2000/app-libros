import React from "react";
import { useOutletContext } from "react-router-dom";
import ListadoDeLibros from "../components/libros/ListadoDeLibros";
import { Box, Typography, Divider } from "@mui/material";

const Home = () => {
  const { seccion } = useOutletContext(); // Recibimos la sección seleccionada desde el Layout

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      {/* Título de Bienvenida */}
      <Typography
        variant="h2"
        gutterBottom
        textAlign="center"
        sx={{
          fontWeight: "bold",
          color: "#1976d2",
          marginBottom: 3,
        }}
      >
        Bienvenido a la App de Libros
      </Typography>

      {/* Subtítulo dinámico según la sección */}
      <Typography
        variant="h5"
        gutterBottom
        textAlign="center"
        sx={{
          fontStyle: "italic",
          color: "#555",
        }}
      >
        {seccion
          ? `Explorando libros de la sección: ${seccion}`
          : "Explora nuestra colección completa de libros"}
      </Typography>

      {/* Línea divisoria */}
      <Divider
        sx={{
          marginY: 4,
          backgroundColor: "#1976d2",
          height: 2,
          width: "60%",
          marginX: "auto",
        }}
      />

      {/* Listado de Libros */}
      <ListadoDeLibros seccion={seccion} />
    </Box>
  );
};

export default Home;
