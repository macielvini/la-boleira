import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

import cakesRoutes from "./routes/cakes.routes.js";
import clientsRoutes from "./routes/clients.routes.js";
import orderRoutes from "./routes/order.routes.js";
import flavourRoutes from "./routes/flavours.routes.js";

app.use(cakesRoutes);
app.use(clientsRoutes);
app.use(orderRoutes);
app.use(flavourRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running in port " + PORT));
