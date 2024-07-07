import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  chatroom: { type: Schema.Types.ObjectId, ref: "ChatRoom", required: true },
  date: { type: Date, default: new Date() },
});

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel;
