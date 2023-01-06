import { Router } from "express";
import { create } from "../controllers/cakes.controller.js";
import { validateCake } from "../middlewares/validateCake.middleware.js";

const router = Router();

router.post("/cakes", validateCake, create);

export default router;
