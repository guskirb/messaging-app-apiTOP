import { Types } from "mongoose";

declare global {
  namespace Express {
    interface User {
      id?: string;
      _id?: Types.ObjectId;
    }
  }
}
