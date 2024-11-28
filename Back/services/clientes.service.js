import { MongoClient, ObjectId } from "mongodb";

// Creo la conexion a la base de datos de MongoDB

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("AH20232CP1");

// Obtener todos los clientes

async function getCustomers() {
  await client.connect();
  return db.collection("Clientes").find().toArray();
}

// Obtener un cliente especifico por su ID

async function getCustomerById(id) {
  await client.connect();
  return db.collection("Clientes").findOne({ _id: new ObjectId(id) });
}

// Agregar un nuevo cliente

async function addNewCustomer(customer) {
  await client.connect();
  return db.collection("Clientes").insertOne(customer);
}

// Eliminar a un cliente

async function deleteCustomer(id) {
  await client.connect();
  return db.collection("Clientes").deleteOne({ _id: new ObjectId(id) });
}

// Agregar un libro a un cliente

async function addBookToCustomer(customerId, bookId) {
  await db
    .collection("Clientes")
    .updateOne(
      { _id: new ObjectId(customerId) },
      { $addToSet: { libros: new ObjectId(bookId) } }
    );
}

// Buscar los libros de los clientes

async function getBookByCustomer(customerId) {
  await client.connect();

  const customer = await db
    .collection("Clientes")
    .findOne({ _id: new ObjectId(customerId) });
  console.log(customer);

  const books = await db
    .collection("Libros")
    .find({ _id: { $in: customer.libros } })
    .toArray();
  console.log(customer.libros);
  return books;
}

export {
  getCustomers,
  addNewCustomer,
  deleteCustomer,
  addBookToCustomer,
  getCustomerById,
  getBookByCustomer,
};
