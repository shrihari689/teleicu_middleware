import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import helmet from "helmet";
import cors from "cors";

import { cameraRouter } from "./router/cameraRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundController } from "./controller/NotFoundController.js";

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cameraRouter);

app.use(errorHandler);
app.all("*", notFoundController);

app.listen(PORT, () =>
  console.log(`[SERVER] : Middleware App listening at http://localhost:${PORT}`)
);