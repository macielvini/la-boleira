import { connection } from "../database/server.js";

export async function create(req, res) {
  const { clientId, cakeId, quantity } = req.body;
  const { cake } = res.locals;
  try {
    connection.query(
      `
    INSERT INTO orders
    (client_id, cake_id, quantity, total_price)
    VALUES ($1, $2, $3, $4)
    `,
      [clientId, cakeId, quantity, quantity * cake.price]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
