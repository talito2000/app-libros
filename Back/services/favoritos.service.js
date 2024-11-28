import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
await client.connect(); // Asegúrate de conectar el cliente a la base de datos
const db = client.db("AH20232CP1");

export const agregarFavorito = async (userId, libroId) => {
  return await db.collection("favoritos").insertOne({
    userId: new ObjectId(userId),
    libroId: new ObjectId(libroId),
  });
};

export const obtenerFavoritosPorUsuario = async (userId) => {
  return await db
    .collection("favoritos")
    .aggregate([
      { $match: { userId: new ObjectId(userId) } },
      {
        $lookup: {
          from: "Libros", // Nombre de la colección de libros
          localField: "libroId",
          foreignField: "_id",
          as: "libro",
        },
      },
      { $unwind: "$libro" }, // Desenrollamos el array "libro"
    ])
    .toArray();
};
