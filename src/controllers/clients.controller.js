import { connection } from "../database/server.js";

export async function create(req, res) {
  const { name, address, phone } = req.body;
  try {
    await connection.query(
      `
    INSERT INTO clients
    (name, address, phone)
    VALUES ($1, $2, $3);
    `,
      [name, address, phone]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function findAll(req, res) {
  const { id } = req.params;

  try {
    const findClientId = await connection.query(
      `
      SELECT * FROM clients WHERE id = $1;
    `,
      [id]
    );

    if (!findClientId.rowCount) {
      return res.sendStatus(404);
    }

    const orders = await connection.query(
      `
      SELECT 
      o.id AS "orderId",
      o.quantity,
      o.created_at AS "createdAt",
      o.total_price AS "totalPrice",
      ck.name AS "cakeName"
      FROM clients c
      JOIN orders o
      ON o.client_id = c.id
      JOIN cakes ck
      ON o.cake_id = ck.id
      WHERE o.client_id = $1;
    `,
      [id]
    );

    res.send(orders.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
