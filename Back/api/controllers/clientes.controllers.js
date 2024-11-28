import * as librosService from "../../services/libros.service.js";
import * as customerService from "../../services/clientes.service.js";

export async function getBooksByCustomerId(req, res) {
  const books = await customerService.getBookByCustomer(req.params.id);
  res.status(200).json(books);
}

export function getCustomers(req, res) {
  customerService
    .getCustomers()
    .then((customers) => res.status(200).json(customers));
}

export async function getCustomerById(req, res) {
  const books = await librosService.getBookByCustomer(req.params.id);
  res.status(200).json(books);
}

export async function addNewCustomer(req, res) {
  const customer = await customerService.addNewCustomer(req.body);
  res.status(201).json(customer);
}

export async function addBookToCustomer(req, res) {
  const { bookId } = req.body;
  const customerId = req.params.id;
  await customerService.addBookToCustomer(customerId, bookId);
  res.status(200).json({ message: "Libro agregado correctamente" });
}
