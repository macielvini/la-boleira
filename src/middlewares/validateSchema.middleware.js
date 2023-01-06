export function validateSchema(schema) {
  return (req, res, next) => {
    const data = req.body;
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((e) => e.message);
      return res.status(422).send(message);
    }

    res.locals.data = data;
    next();
  };
}

export function validateSchema400(schema) {
  return (req, res, next) => {
    const data = req.body;
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((e) => e.message);
      return res.status(400).send(message);
    }

    res.locals.data = data;
    next();
  };
}
