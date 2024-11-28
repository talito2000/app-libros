import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navbar y footer/Navbar";

const Layout = () => {
  const [seccion, setSeccion] = useState(""); // Estado para la sección seleccionada

  // Función para manejar la selección de sección desde el NavBar
  const handleFiltrarSeccion = (seccionSeleccionada) => {
    setSeccion(seccionSeleccionada); // Actualizar la sección seleccionada
  };

  return (
    <>
      {/* Pasamos handleFiltrarSeccion al NavBar */}
      <NavBar onFiltrarSeccion={handleFiltrarSeccion} />
      {/* Enviamos la sección seleccionada como prop a las rutas */}
      <main style={{ flex: 1 }}>
        <Outlet context={{ seccion }} />
      </main>
    </>
  );
};

export default Layout;
