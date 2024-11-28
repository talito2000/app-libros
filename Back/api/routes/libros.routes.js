import { Router } from "express";
import * as controller from "../controllers/libros.controllers.js";
import * as customerController from "../controllers/clientes.controllers.js";
import { validateLibro } from "../../middleware/libros.middleware.js";
import { validateCliente } from "../../middleware/clientes.middleware.js";

const route = Router();

route.get("/books/section/:section", controller.getBooksBySection);
route.get("/books", controller.getBooks);
route.post("/books", [validateLibro], controller.addNewBook);
route.get("/books/:id", controller.getBookById);
route.put("/books/:id", [validateLibro], controller.replaceBook);
route.patch("/books/:id", [validateLibro], controller.updateBook);
route.delete("/books/:id", controller.deleteBook);

route.get("/customers", customerController.getCustomers);
route.post("/customers", [validateCliente], customerController.addNewCustomer);
route.get("/customers/:id/books", customerController.getBooksByCustomerId);
route.post("/customers/:id/books", customerController.addBookToCustomer);

export default route;
