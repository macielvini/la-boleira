import { Router } from "express";
import { create } from "../controllers/flavours.controller.js";
import { validate } from "../middlewares/validateFlavour.middleware.js";
import { validateSchema400 } from "../middlewares/validateSchema.middleware.js";
import { flavourSchema } from "../models/flavour.model.js";

const router = Router();

router.post("/flavours", validateSchema400(flavourSchema), validate, create);

export default router;
