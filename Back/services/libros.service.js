import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("AH20232CP1");

export async function getBooksBySection(section) {
  try {
    return await db.collection("Libros").find({ section }).toArray();
  } catch (error) {
    throw new Error("Error al obtener libros por sección: " + error.message);
  }
}

async function getBooks(seccion, año) {
  await client.connect();
  if (seccion && año) {
    return db
      .collection("Libros")
      .find({
        section: seccion,
        year: { $gte: año },
      })
      .toArray();
  }
  if (año) {
    return db
      .collection("Libros")
      .find({ year: { $gte: año } })
      .toArray();
  }
  if (seccion) {
    return db.collection("Libros").find({ section: seccion }).toArray();
  }

  return db.collection("Libros").find().toArray();
}

async function getBookPorId(id) {
  await client.connect();

  // Verifica si el ID es un ObjectId válido
  if (!ObjectId.isValid(id)) {
    throw new Error("El ID proporcionado no es un ObjectId válido");
  }

  // Si es válido, busca el libro
  return db.collection("Libros").findOne({ _id: new ObjectId(id) });
}

async function addNewBook(book) {
  await client.connect();
  return db.collection("Libros").insertOne({
    ...book,
    customerId: new ObjectId(book.customerId),
  });
}

async function deleteBook(id) {
  await client.connect();
  return db.collection("Libros").deleteOne({ _id: new ObjectId(id) });
}

async function replaceBook(id, updateBook) {
  await client.connect();
  return db
    .collection("Libros")
    .replaceOne({ _id: new ObjectId(id) }, updateBook);
}

async function updateBook(id, updatedBook) {
  await client.connect();
  return db
    .collection("Libros")
    .updateOne({ _id: new ObjectId(id) }, { $set: updatedBook });
}

export {
  getBooks,
  getBookPorId,
  addNewBook,
  deleteBook,
  replaceBook,
  updateBook,
};

// function getBooksBySection(section) {
//   return readFile(path.resolve("data/libros.json"), { encoding: "utf-8" })
//     .then((data) => {
//       const books = JSON.parse(data);
//       return books.filter(
//         (book) => book.section.toLowerCase() === section.replace("-", " ")
//       );
//     })
//     .catch((error) => {
//       console.error("Error al leer los libros", error);
//     });
// }

// -------------------------------------------------------------------------------------------------------
// Section: (getBooks)
// let books = await readFile(path.resolve("data/libros.json"), {
//   encoding: "utf-8",
// });
// books = JSON.parse(books);
// if (section) {
//   const filterBooks = books.filter(
//     (book) => book.section.toLowerCase() === section
//   );
//   return filterBooks;
// } else {
//   return books;
// }
//------------------------------------------------------------------------------
// Por Id: (getBookById)
// return getBooks()
// .then((books) => {
//   return books.find((book) => book.id == id);
// })
// .catch((error) => {
//   console.error("No se pudo encontrar el libro seleccionada", { error });
// });
//------------------------------------------------------------------------------
// Agregar nuevo libro (addNewBook)
// return getBooks().then(async (books) => {
//   const newBook = {
//     id: books.length + 1,
//     ...book,
//   };
//   books.push(newBook);
//   await writeFile("./data/libros.json", JSON.stringify(books));
//   return newBook;
// });
//-----------------------------------------------------------------------------
// Eliminar peliucla (deleteBook)
// const books = await getBooks();
// const filteredBooks = books.filter((book) => book.id != id);
// await writeFile("./data/libros.json", JSON.stringify(filteredBooks));
