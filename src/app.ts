import express, { json, urlencoded } from "express";
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
