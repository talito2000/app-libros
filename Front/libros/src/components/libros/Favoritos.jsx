import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3333/api/favoritos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setFavoritos(data))
      .catch((err) => console.error("Error al obtener favoritos:", err));
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Favoritos
      </Typography>
      <Grid container spacing={4}>
        {favoritos.map((favorito) => (
          <Grid item xs={12} sm={6} md={4} key={favorito.libro._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={favorito.libro.image}
                alt={favorito.libro.title}
              />
              <CardContent>
                <Typography variant="h6">{favorito.libro.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {favorito.libro.author}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={() => navigate(`/books/${favorito.libro._id}`)}
                >
                  Ver Detalle
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Favoritos;
