import * as service from "../../services/libros.service.js";

function getBooks(req, res) {
  const { section, year } = req.query;
  service
    .getBooks(section, parseInt(year))
    .then((books) => res.status(200).json(books));
}

export const getBooksBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const libros = await service.getBooksBySection(section);
    res.status(200).json(libros);
  } catch (error) {
    console.error("Error al obtener libros por sección:", error.message);
    res.status(500).json({ message: "Error al obtener libros por sección" });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await service.getBookPorId(id);
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error al obtener el libro:", error.message);
    res.status(400).json({ message: error.message });
  }
};

async function addNewBook(req, res) {
  const { title, author, year, section, link, image } = req.body;
  const newBook = await service.addNewBook({
    title,
    author,
    year,
    section,
    link,
    image,
  });
  res.status(201).json(newBook);
}

function deleteBook(req, res) {
  const id = req.params.id;
  service.deleteBook(id).then((id) => res.status(202).json({ id: id }));
}

function replaceBook(req, res) {
  const id = req.params.id;
  service.replaceBook(id, req.body).then((book) => res.status(201).json(book));
}

function updateBook(req, res) {
  const id = req.params.id;
  service.updateBook(id, req.body).then((book) => {
    if (book) {
      res.status(201).json(book);
    } else {
      res.status(404);
    }
  });
}

export { getBooks, addNewBook, deleteBook, replaceBook, updateBook };
