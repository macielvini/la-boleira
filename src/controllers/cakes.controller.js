import { connection } from "../database/server.js";

export async function create(req, res) {
  const { name, price, image, description } = req.body;
  try {
    await connection.query(
      `
      INSERT INTO cakes (name, price, image, description) 
      VALUES ($1,$2,$3,$4);
    `,
      [name, price, image, description]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
