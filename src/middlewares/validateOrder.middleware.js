import { connection } from "../database/server.js";

export async function validate(req, res, next) {
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  try {
    const client = await connection.query(
      `
      SELECT *
      FROM clients c
      WHERE c.id = $1
    `,
      [clientId]
    );

    const cake = await connection.query(
      `
      SELECT *
      FROM cakes c
      WHERE c.id = $1
    `,
      [cakeId]
    );

    if (!client.rowCount || !cake.rowCount) {
      return res.sendStatus(404);
    }

    res.locals.cake = cake.rows[0];

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
