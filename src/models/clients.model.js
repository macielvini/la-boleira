import joi from "joi";

export const clientSchema = joi.object({
  name: joi.string().required(),
  address: joi.string().required(),
  phone: joi
    .string()
    .max(11)
    .min(10)
    .regex(/^[0-9]+$/)
    .required(),
});
