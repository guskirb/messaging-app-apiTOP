import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema({
  name: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  pinned: { type: Boolean, default: false },
  last_message: { type: String },
  last_active: { type: Date, default: new Date() },
});

const ChatRoomModel = mongoose.model("ChatRoom", ChatRoomSchema);
export default ChatRoomModel;
