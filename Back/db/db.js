import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

client
  .connect()
  .then(async () => {
    console.log("Conectado!");
    const db = client.db("AH20232CP1");
    const datos = await db.collection("Libros").find().toArray();
    console.log(datos);
  })
  .catch(() => console.log("No me pude conectar"));
