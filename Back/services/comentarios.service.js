import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();
const db = client.db("AH20232CP1");
const comentarios = db.collection("Comentarios");

// Servicio para agregar un comentario
export async function addComment(libroId, usuarioId, email, comentario) {
  const nuevoComentario = {
    libro_id: new ObjectId(libroId), // ID del libro
    usuario_id: new ObjectId(usuarioId), // ID del usuario
    usuario_email: email, // Email del usuario
    comentario: comentario, // Texto del comentario
    fecha: new Date(), // Fecha del comentario
  };

  const result = await comentarios.insertOne(nuevoComentario); // Inserta en la colección
  return { ...nuevoComentario, _id: result.insertedId }; // Devuelve el comentario creado
}

// Servicio para obtener los comentarios de un libro por su ID
export async function getCommentsByBookId(libroId) {
  return db
    .collection("Comentarios")
    .find({ libro_id: new ObjectId(libroId) })
    .toArray();
}

// Servicio para eliminar un comentario por su ID
export async function deleteComment(commentId) {
  return db
    .collection("Comentarios")
    .deleteOne({ _id: new ObjectId(commentId) });
}
