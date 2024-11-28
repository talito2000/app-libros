import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Grid, Alert } from "@mui/material";

export const Register = () => {
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

    const response = await fetch("http://localhost:3333/api/usuarios", {
      method: "POST",
      body: JSON.stringify({ email, password, passwordConfirm }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      navigate("/login");
      console.log("Usuario Registrado con exito!");
    } else {
      setError("El usuario que intentas crear ya existe!");
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  // Creamos una funcion que cambie los estilos de los inputs si las passwords no coinciden.
  // const getInputClassNamePass = () => {
  //   return password !== passwordConfirm
  //     ? "form-control is-invalid"
  //     : "form-control";
  // };

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
      {/* Título del formulario */}
      <Typography variant="h4" align="center" gutterBottom>
        Registrarse
      </Typography>

      <Grid container spacing={2}>
        {/* Campo de Email */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="email"
            id="email"
            label="Email"
            placeholder="Email..."
            variant="outlined"
            onChange={handleChangeEmail}
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
            onChange={handleChangePassword}
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
            onChange={handleChangePasswordConfirm}
            error={password !== passwordConfirm} // Validación en tiempo real
            helperText={
              password !== passwordConfirm
                ? "Las contraseñas no coinciden."
                : ""
            }
          />
        </Grid>
      </Grid>

      {/* Botón de Envío */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Registrarse
      </Button>

      {/* Enlace a la página de Login */}
      <Typography align="center" sx={{ mt: 2 }}>
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
          Login
        </Link>
      </Typography>

      {/* Mensaje de error */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};
