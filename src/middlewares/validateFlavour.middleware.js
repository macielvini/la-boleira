import { connection } from "../database/server.js";

export async function validate(req, res, next) {
  const { name } = req.body;

  try {
    const flavour = await connection.query(
      `
    SELECT * FROM flavours WHERE name = $1
    `,
      [name]
    );

    if (flavour.rowCount) return res.sendStatus(409);

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
