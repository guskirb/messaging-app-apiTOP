import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { DateTime } from "luxon";

const MessageSchema = new Schema(
  {
    message: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    chatroom: { type: Schema.Types.ObjectId, ref: "ChatRoom", required: true },
    date: { type: Date, default: new Date() },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

MessageSchema.virtual("date_formatted").get(function () {
  return {
    date: DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_SHORT),
    time: DateTime.fromJSDate(this.date).toLocaleString(DateTime.TIME_SIMPLE),
  };
});

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel;
