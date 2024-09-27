import express from "express";
import cors from "cors";
import morgan from "morgan"

import userRoutes from "./routes/user.routes";
import parkingRoutes from "./routes/parking.routes";
import vehiclesRoutes from "./routes/vehicles.routes"

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", parkingRoutes);
app.use("/api", vehiclesRoutes)

export default app;