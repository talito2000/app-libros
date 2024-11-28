import express from "express";
import * as controllers from "../controllers/libros.controller.js";

const route = express.Router();

route.get("/books/nuevo", controllers.newBook);
route.post("/books/nuevo", controllers.addNewBookController);
route.get("/books/eliminar/:id", controllers.deleteBookController);
route.get("/books/:id", controllers.getBookByIdController);
route.get("/books", controllers.getBooksController);
// route.get("/books/:section", controllers.getBooksSectionController);

export default route;
