import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import ProtectedRoute from "./components/rutas/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import { Register } from "./components/login/Register.jsx";
import Login from "./components/login/Login.jsx";
import DetalleDeLibro from "./components/libros/DetalleDeLibro.jsx";
import AgregarLibro from "./components/libros/AgregarLibro.jsx";
import ConfirmacionLibro from "./components/libros/ConfirmacionLibro.jsx";
import Favoritos from "./components/libros/Favoritos.jsx";
import Perfil from "./components/login/Perfil.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/agregar-libro",
        element: (
          <ProtectedRoute>
            <AgregarLibro />
          </ProtectedRoute>
        ),
      },
      {
        path: "/perfil",
        element: (
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        ),
      },
      {
        path: "/books/:id",
        element: (
          <ProtectedRoute>
            <DetalleDeLibro />
          </ProtectedRoute>
        ),
      },
      {
        path: "/confirmacion-libro",
        element: (
          <ProtectedRoute>
            <ConfirmacionLibro />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favoritos",
        element: (
          <ProtectedRoute>
            <Favoritos />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
