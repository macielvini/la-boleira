import { Router } from "express";
import { create } from "../controllers/order.controller.js";
import { validate } from "../middlewares/validateOrder.middleware.js";
import { validateSchema400 } from "../middlewares/validateSchema.middleware.js";
import { orderSchema } from "../models/order.model.js";

const router = Router();

router.post("/order", validateSchema400(orderSchema), validate, create);

export default router;
