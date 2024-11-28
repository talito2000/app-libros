import express from "express";
import BooksRoute from "./routes/libros.routes.js";
import apiLibros from "./api/routes/libros.routes.js";
import apiUsuario from "./api/routes/usuarios.routes.js";
import apiComentarios from "./api/routes/comentarios.routes.js";
import apiFavoritos from "./api/routes/favoritos.routes.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
};

app.use(cors(corsOptions));

app.use("/api", apiLibros);
app.use("/api", apiUsuario);
app.use("/api", apiComentarios);
app.use("/api", apiFavoritos);
app.use(BooksRoute);

app.listen(3333, () => console.log("Ready..."));
