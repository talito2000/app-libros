import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { crearToken } from "./token.service.js";

const cliente = new MongoClient("mongodb://localhost:27017");
const db = cliente.db("AH20232CP1");
// Creamos la collection 'usuarios'.
const usuarios = db.collection("usuarios");

export async function crearUsuario(usuario) {
  // Conectamos a la base de datos.
  await cliente.connect();

  // Comprobamos si el usuario existe previo a crear uno nuevo.
  const existeElUsuario = await usuarios.findOne({ email: usuario.email });
  if (existeElUsuario) throw new Error("El usuario con ese Email ya existe.");

  // Creamos el objeto del nuevo usuario con el campo "nombre" incluido
  const nuevoUsuario = {
    nombre: usuario.nombre, // Incluimos el nombre
    email: usuario.email,
    password: await bcrypt.hash(usuario.password, 10), // Hasheamos la contraseña
    passwordConfirm: usuario.passwordConfirm, // Mantenemos el passwordConfirm
    createdAt: new Date(), // Agregamos la fecha actual
  };

  // Insertamos el usuario en la base de datos.
  await usuarios.insertOne(nuevoUsuario);

  // Retornamos el usuario, ocultando la contraseña (pero dejando passwordConfirm si es necesario).
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

export const obtenerUsuarioPorId = async (userId) => {
  await cliente.connect();
  return await db.collection("usuarios").findOne({ _id: new ObjectId(userId) });
};
