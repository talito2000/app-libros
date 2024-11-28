// ConfirmacionLibro.jsx
import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConfirmacionLibro = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 500,
        margin: "50px auto",
        textAlign: "center",
        backgroundColor: "#ffffff",
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Typography variant="h5" gutterBottom>
        ¡Libro agregado correctamente!
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        Tu libro se ha registrado exitosamente en el sistema.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ marginRight: 2 }}
      >
        Ir a Home
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/agregar-libro")}
      >
        Agregar otro libro
      </Button>
    </Box>
  );
};

export default ConfirmacionLibro;
