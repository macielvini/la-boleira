import { connection } from "../database/server.js";

export async function create(req, res) {
  const { name } = req.body;

  try {
    await connection.query("INSERT INTO flavours (name) VALUES ($1)", [name]);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
