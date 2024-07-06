import mongoose from "mongoose";
import "dotenv/config";

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_STRING!);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
