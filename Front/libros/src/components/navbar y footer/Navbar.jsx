import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";

const NavBar = ({ onFiltrarSeccion }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Obtenemos el token del localStorage para verificar si el usuario está autenticado

  const [anchorEl, setAnchorEl] = useState(null); // Estado para controlar el menú desplegable

  // Función para abrir el menú
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Abrimos el menú en la posición del botón
  };

  // Función para cerrar el menú
  const handleMenuClose = () => {
    setAnchorEl(null); // Cerramos el menú
  };

  // Función para filtrar por sección y cerrar el menú
  const handleFiltrarSeccion = (seccion) => {
    if (onFiltrarSeccion) {
      onFiltrarSeccion(seccion); // Enviamos la sección seleccionada al componente padre
    }
    handleMenuClose(); // Cerrar el menú
  };

  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminamos el token del localStorage
    navigate("/login"); // Redirigimos al usuario a la página de login
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Título o logo de la App */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          App de Libros
        </Typography>

        <Box>
          {token && (
            <>
              {/* Botón Home */}
              <Button
                color="inherit"
                component={Link}
                to="/"
                onClick={() => onFiltrarSeccion(null)}
                sx={{ marginRight: 2 }}
              >
                Home
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/perfil"
                sx={{ marginRight: 2 }}
              >
                Perfil
              </Button>

              {/* Botón Favoritos */}
              <Button
                color="inherit"
                component={Link}
                to="/favoritos"
                sx={{ marginRight: 2 }}
              >
                Favoritos
              </Button>

              {/* Botón para abrir el menú de Secciones */}
              <Button
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ marginRight: 2 }}
              >
                Secciones
              </Button>

              {/* Menú desplegable para las secciones */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleFiltrarSeccion("novelas")}>
                  Novelas
                </MenuItem>
                <MenuItem onClick={() => handleFiltrarSeccion("misterio")}>
                  Misterio
                </MenuItem>
                <MenuItem
                  onClick={() => handleFiltrarSeccion("ciencia ficcion")}
                >
                  Ciencia Ficción
                </MenuItem>
                <MenuItem onClick={() => handleFiltrarSeccion("clasicos")}>
                  Clásicos
                </MenuItem>
                <MenuItem onClick={() => handleFiltrarSeccion("biografias")}>
                  Biografías
                </MenuItem>
              </Menu>

              {/* Botón Agregar Libro */}
              <Button
                color="inherit"
                component={Link}
                to="/agregar-libro"
                sx={{ marginRight: 2 }}
              >
                Agregar Libro
              </Button>

              {/* Botón Logout */}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          {!token && (
            <>
              {/* Botón Login */}
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ marginRight: 2 }}
              >
                Login
              </Button>
              {/* Botón Register */}
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{ marginRight: 2 }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
