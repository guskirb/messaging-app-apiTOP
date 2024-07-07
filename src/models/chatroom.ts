import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
});

const ChatRoomModel = mongoose.model("ChatRoom", ChatRoomSchema);
export default ChatRoomModel;
