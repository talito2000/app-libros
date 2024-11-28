import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { crearToken } from "./token.service.js";

const cliente = new MongoClient("mongodb://localhost:27017");
const db = cliente.db("AH20232CP1");
// Creamos la collection 'usuarios'.
const usuarios = db.collection("usuarios");

export async function crearUsuario(usuario) {
  // conectamos a la base de datos.
  await cliente.connect();
  // Comprobamos si el usuario existe previo a crear uno nuevo.
  const existeElUsuario = await usuarios.findOne({ email: usuario.email });
  if (existeElUsuario) throw new Error("El usuario con ese Email ya existe.");
  // Eliminamos del objeto usuario el campo "passwordConfirm" -> ya que no es necesario en la base de datos ni para la autenticacion.
  const nuevoUsuario = { ...usuario, passwordConfirm: undefined };
  // Hasheamos la contraseña con (bcrypt) (10) -> Define la cantidad de rondas de hashing (la fuerza del hash).
  nuevoUsuario.password = await bcrypt.hash(usuario.password, 10);
  // Lo agregamos a la base de datos.
  await usuarios.insertOne(nuevoUsuario);
  // Retornamos el usuarion, sin el campo password.
  return { ...nuevoUsuario, password: undefined };
}

export async function login(usuario) {
  await cliente.connect();

  // Chequeamos si el usuario existe.
  // Lo buscamos con 'findOne' en la coleccion usuarios -> Preguntando por el mismo mail del usuario que esta Logeando.
  const existeElUsuario = await usuarios.findOne({ email: usuario.email });
  if (!existeElUsuario) throw new Error("El usuario no existe");
  // bcrypt.compare -> permite comparar la contraseñas.
  // Validamos si la contraseña coincide.
  const esValido = await bcrypt.compare(
    usuario.password,
    existeElUsuario.password
  );
  if (!esValido)
    throw new Error("No se pudo iniciar sesion, la contraseña es incorrecta");
  // Genera un token JWT utilizando los datos del usuario (sin incluir contraseñas ni información sensible).
  // Retorna el token generado.
  const token = await crearToken(existeElUsuario);

  return {
    ...existeElUsuario,
    token: token,
    password: undefined,
    passwordConfirm: undefined,
  };
}
