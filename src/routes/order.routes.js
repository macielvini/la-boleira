import { Router } from "express";
import { create, find, findAll } from "../controllers/order.controller.js";
import { validate } from "../middlewares/validateOrder.middleware.js";
import { validateSchema400 } from "../middlewares/validateSchema.middleware.js";
import { orderSchema } from "../models/order.model.js";

const router = Router();

router.post("/order", validateSchema400(orderSchema), validate, create);
router.get("/order", findAll);
router.get("/order/:id", find);

export default router;
