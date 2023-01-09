import { Router } from "express";
import { create } from "../controllers/cakes.controller.js";
import { validateCake } from "../middlewares/validateCake.middleware.js";
import { validateFlavourId } from "../middlewares/validateFlavour.middleware.js";

const router = Router();

router.post("/cakes", validateCake, validateFlavourId, create);

export default router;
