import joi from "joi";

export const dateSchema = joi.object({
  date: joi.date(),
});
