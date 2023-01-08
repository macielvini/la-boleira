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

export async function validateFlavourId(req, res, next) {
  const { flavourId } = req.body;

  try {
    const flavour = await connection.query(
      `
    SELECT * FROM flavours WHERE id = $1;
    `,
      [flavourId]
    );

    if (!flavour.rowCount) return res.sendStatus(404);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
