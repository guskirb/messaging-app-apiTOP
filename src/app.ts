import express, { json, urlencoded } from "express";
import path, { join } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import { lastOnline } from "./middleware/online.js";
import { userFromJWT } from "./middleware/user-from-JWT.js";
import "dotenv/config";
import "./config/mongo-config.js";
import "./config/passport.js";
import "./config/cloudinary.js";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import chatRoomRouter from "./routes/chatroom.js";

const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(join(__dirname, "public")));
app.use(userFromJWT);
app.use(lastOnline);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/chatrooms", chatRoomRouter);

export default app;
