import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();
const db = client.db("AH20232CP1");
const tokens = db.collection("tokens");

const SECRET_KEY = "admin123";

export async function crearToken(usuario) {
  // Elimina campos sensibles del payload
  // Se extraen los campos name, password, y passwordConfirm, y se eliminan del resto de las propiedades.
  // Estas propiedades extraídas se almacenan en variables con esos mismos nombres (name, password, passwordConfirm).
  // Todas las propiedades que no fueron extraídas (name, password, passwordConfirm) se agrupan en el objeto safeUser.
  // Automáticamente, safeUser se convierte en un objeto que contiene las propiedades restantes del objeto usuario.
  const { name, password, passwordConfirm, ...safeUser } = usuario;
  // Genera el token JWT
  const token = jwt.sign(safeUser, SECRET_KEY, { expiresIn: "2h" });
  // Guarda el token en la base de datos
  await tokens.insertOne({
    token: token,
    usuario_id: usuario._id,
    usuario: usuario.name,
    creadoEn: new Date(),
  });
  return token;
}

// Recibe el token como parametro.
// 'jwt.verify' -> Toma 2 argumentos, el Token y la clave secreta.
// Busca en la coleccion de tokens que cumpla con 2 condiciones
// 1. Que coincida con el Token recibido.
// 2. Que coincida con el usuario_id de usuario.
// Validacion
// Si el token es valido y la sesion esta activa devuelve el 'payload' -> Datos del usuario.
// iat: fecha de creacion del Token.
// exp: fecha de expiracion del Token.

export async function validarToken(token) {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    const sesionActiva = await tokens.findOne({
      token,
      usuario_id: new ObjectId(payload._id),
    });
    if (!sesionActiva)
      throw new Error("Token no encontrado en la base de datos");
    if (payload.exp < new Date().getTime() / 1000)
      throw new Error("Token Expirado");
    return payload;
  } catch (error) {
    throw new Error("Token Invalido");
  }
}
