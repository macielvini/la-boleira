import joi from "joi";

export const flavourSchema = joi.object({
  name: joi.string().required().max(20),
});
