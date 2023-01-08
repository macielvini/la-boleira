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

export async function findAll(req, res) {
  const date = req.query.date;

  try {
    let orders;

    if (date) {
      orders = await connection.query(
        `
          SELECT
            json_build_object(
              'id', cl.id,
              'name', cl.name,
              'address', cl.address,
              'phone', cl.phone
            ) AS client,
            json_build_object(
              'id', ck.id,
              'name', ck.name,
              'price', ck.price,
              'description', ck.description,
              'image', ck.image
            ) AS cake,
            o.id AS "orderId",
            o.created_at AS "createdAt",
            o.quantity,
            o.total_price AS "totalPrice"
          FROM orders o
          JOIN clients cl
          ON o.client_id = cl.id
          JOIN cakes ck
          ON o.cake_id = ck.id 
          WHERE date_trunc('day', created_at) = $1;
    `,
        [date]
      );
    } else {
      orders = await connection.query(
        `
          SELECT
            json_build_object(
              'id', cl.id,
              'name', cl.name,
              'address', cl.address,
              'phone', cl.phone
            ) AS client,
            json_build_object(
              'id', ck.id,
              'name', ck.name,
              'price', ck.price,
              'description', ck.description,
              'image', ck.image
            ) AS cake,
            o.id AS "orderId",
            o.created_at AS "createdAt",
            o.quantity,
            o.total_price AS "totalPrice"
          FROM orders o
          JOIN clients cl
          ON o.client_id = cl.id
          JOIN cakes ck
          ON o.cake_id = ck.id 
        `
      );
    }

    if (!orders.rowCount) return res.status(404).send([]);

    res.send(orders.rows.reverse());
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function find(req, res) {
  const { id } = req.params;

  try {
    const orders = await connection.query(
      `
          SELECT
            json_build_object(
              'id', cl.id,
              'name', cl.name,
              'address', cl.address,
              'phone', cl.phone
            ) AS client,
            json_build_object(
              'id', ck.id,
              'name', ck.name,
              'price', ck.price,
              'description', ck.description,
              'image', ck.image
            ) AS cake,
            o.id AS "orderId",
            o.created_at AS "createdAt",
            o.quantity,
            o.total_price AS "totalPrice"
          FROM orders o
          JOIN clients cl
          ON o.client_id = cl.id
          JOIN cakes ck
          ON o.cake_id = ck.id 
          WHERE o.id = $1
    `,
      [id]
    );

    if (!orders.rowCount) return res.sendStatus(404);

    res.send(orders.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
