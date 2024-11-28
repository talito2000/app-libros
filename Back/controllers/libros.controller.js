import * as views from "../views/libros.view.js";
import {
  getBooks,
  getBookPorId,
  addNewBook,
  deleteBook,
} from "../services/libros.service.js";

const getBooksController = async (request, response) => {
  const books = await getBooks(request.query.section);
  if (request.query.section) {
    response.send(
      views.createPage(
        `Libros de ${request.query.section}`,
        views.createListBooks(books)
      )
    );
  } else {
    response.send(views.createPage(`Inicio`, views.createListBooks(books)));
  }
};

const getBookByIdController = (request, response) => {
  console.log(request.params.id);

  getBookPorId(request.params.id).then((book) => {
    response.send(views.createPage("Libro ", views.createBookDetails(book)));
  });
};

const newBook = (request, response) => {
  response.send(views.createPage("Nuevo Libro", views.newBook()));
};

const addNewBookController = (request, response) => {
  addNewBook(request.body).then(() => {
    response.send(
      views.createPage(
        "Nuevo Libro agregado correctamente:",
        `<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-100">
          <div class="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
            <h1 class="text-3xl font-bold text-center text-green-600 mb-6">Nuevo Libro Agregado Correctamente</h1>
              <div class="text-left text-gray-800">
                <p class="text-xl mb-2">Título: <b class="text-blue-600">${request.body.title}</b></p>
                <p class="text-xl mb-2">Autor: <b class="text-blue-600">${request.body.author}</b></p>
                <p class="text-xl mb-2">Año: <b class="text-blue-600">${request.body.year}</b></p>
                <p class="text-xl">Sección: <b class="text-blue-600">${request.body.section}</b></p>
              </div>
          </div>
        </div>`
      )
    );
  });
};

const deleteBookController = (request, response) => {
  const bookId = request.params.id;
  deleteBook(bookId)
    .then(() =>
      response.send(
        views.createPage(
          " Libro Eliminado correctamente:",
          `<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-100">
            <div class="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
              <h1 class="text-3xl font-bold text-center text-green-600 mb-6">Libro Eliminado Correctamente</h1>
            </div>
          </div>`
        )
      )
    )
    .catch((error) => {
      console.log(error);
    });
};

export {
  getBooksController,
  getBookByIdController,
  addNewBookController,
  newBook,
  deleteBookController,
};

// const getBooksController = (request, response) => {
//   getBooks().then((books) =>
//     response.send(views.creartePage("Books", views.createListBooks(books)))
//   );
// };

// function getBooksController2(req, res) {
//   getBooks().then((books) =>
//     response.send(views.creartePage("Books", views.createListBooks(books)))
//   );
// }

// const getBooksController = async (request, response) => {
//   const books = await getBooks();
//   response.send(views.creartePage("Books", views.createListBooks(books)));
// };

// const getBooksSectionController = async (request, response) => {
//   const section = request.params.section;
//   try {
//     const books = await getBooksBySection(section);
//     response.send(views.createPage("Books", views.createListBooks(books)));
//   } catch (error) {
//     console.log("Error al traer la seccion", error);
//   }
// };
