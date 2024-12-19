import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Grid, Alert } from "@mui/material";

export const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/api/usuarios", {
        method: "POST",
        body: JSON.stringify({ nombre, email, password, passwordConfirm }), // Incluye el nombre
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        navigate("/login");
        console.log("Usuario Registrado con éxito!");
      } else {
        const data = await response.json();
        setError(data.message || "Error al crear el usuario.");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        marginTop: 8,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Registrarse
      </Typography>

      <Grid container spacing={2}>
        {/* Campo de Nombre */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="nombre"
            label="Nombre"
            placeholder="Nombre completo"
            variant="outlined"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Grid>

        {/* Campo de Email */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="email"
            id="email"
            label="Email"
            placeholder="Email..."
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        {/* Campo de Contraseña */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="password"
            id="password"
            label="Password"
            placeholder="Password..."
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>

        {/* Campo de Confirmación de Contraseña */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="password"
            id="passwordVerify"
            label="Confirmar Password"
            placeholder="Password verify..."
            variant="outlined"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            error={password !== passwordConfirm}
            helperText={
              password !== passwordConfirm
                ? "Las contraseñas no coinciden."
                : ""
            }
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Registrarse
      </Button>

      <Typography align="center" sx={{ mt: 2 }}>
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
          Login
        </Link>
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};
