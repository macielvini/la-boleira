import { Router } from "express";
import { create, findAll } from "../controllers/order.controller.js";
import { validate } from "../middlewares/validateOrder.middleware.js";
import { validateSchema400 } from "../middlewares/validateSchema.middleware.js";
import { orderSchema } from "../models/order.model.js";

const router = Router();

router.post("/order", validateSchema400(orderSchema), validate, create);
router.get("/order", findAll);

export default router;
