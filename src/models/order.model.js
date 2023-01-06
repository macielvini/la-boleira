import joi from "joi";

export const orderSchema = joi.object({
  clientId: joi.number().required(),
  cakeId: joi.number().required(),
  quantity: joi.number().greater(0).less(5).required(),
  totalPrice: joi.number().required(),
});
