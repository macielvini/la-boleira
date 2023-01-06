import { connection } from "../database/server.js";
import { cakeSchema } from "../models/cakes.model.js";

export async function validateCake(req, res, next) {
  const { name } = req.body;
  const result = cakeSchema.validate(req.body, { abortEarly: false });

  if (result.error) {
    for (const detail of result.error.details) {
      const { message } = detail;
      switch (detail.path[0]) {
        case "name":
          res.status(400).send(message);
          break;
        case "price":
          res.status(400).send(message);
          break;
        case "description":
          res.status(400).send(message);
          break;
        case "image":
          res.status(422).send(message);
          break;
      }
    }
    return;
  }

  try {
    const find = await connection.query(
      `
      SELECT * FROM cakes WHERE name=$1;
      `,
      [name]
    );

    if (find.rowCount) return res.sendStatus(409);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
