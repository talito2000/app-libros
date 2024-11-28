import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Grid, Alert } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para manejar errores

  // e.preventDefault() -> evitamos la recarga cuando enviamos el formulario.
  // Enviamos los datos -> Cambiamos la URL del FETCH -> Por que cuando logeamos lo hacemos en "http://localhost:3333/api/usuarios/login".
  // Mando un metodo 'POST'
  // En el Body -> Los datos que mando en el cuerpo (Datos del formulario).
  // Headers -> Configuracion base para decirle que le mandamos un JSON.
  // data -> Es todos los datos del usuario autenticado -> Incluyendo su TOKEN.
  // Guardamos el Token en local storage -> usando 'data.token' ya que trae un objeto con todos los datos del usuario autenticado -> ('Para mantener la sesion activa').

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3333/api/usuarios/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data.token);
    if (!data.token) {
      setError("Usuario o contraseña incorrectos");
      return;
    } else {
      localStorage.setItem("token", data.token);
      navigate("/");
    }
  };

  // Creamos 2 funciones para manejar los cambios en los inputs a través de eventos. (v-model)
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
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
        marginTop: 8, // Margen superior para separar del nav
      }}
    >
      {/* Título del formulario */}
      <Typography variant="h4" align="center" gutterBottom>
        Iniciar Sesión
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
      </Grid>

      {/* Botón de Envío */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Iniciar Sesión
      </Button>

      {/* Enlace a la página de Registro */}
      <Typography align="center" sx={{ mt: 2 }}>
        ¿No tienes cuenta?{" "}
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          Registrarse
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

export default Login;
