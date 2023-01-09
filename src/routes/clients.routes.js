import { Router } from "express";
import { create, findAll } from "../controllers/clients.controller.js";
import { validateSchema400 } from "../middlewares/validateSchema.middleware.js";
import { clientSchema } from "../models/clients.model.js";

const router = Router();

router.post("/clients", validateSchema400(clientSchema), create);
router.get("/clients/:id/orders", findAll);

export default router;
