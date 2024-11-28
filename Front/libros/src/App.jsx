import React, { useState } from "react";
import NavBar from "./NavBar";
import ListadoDeLibros from "./ListadoDeLibros";

const App = () => {
  const [seccionFiltrada, setSeccionFiltrada] = useState("");

  const handleFiltrarSeccion = (seccion) => {
    setSeccionFiltrada(seccion);
  };

  return (
    <>
      <NavBar onFiltrarSeccion={handleFiltrarSeccion} />
      <ListadoDeLibros seccion={seccionFiltrada} />
    </>
  );
};

export default App;
