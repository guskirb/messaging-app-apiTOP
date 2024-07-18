import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { DateTime } from "luxon";

const ChatRoomSchema = new Schema(
  {
    name: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    pinned: { type: Boolean, default: false },
    last_message: { type: String },
    last_active: { type: Date, default: Date.now() },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

ChatRoomSchema.virtual("last_active_formatted").get(function () {
  return DateTime.fromJSDate(this.last_active).toRelative();
});

const ChatRoomModel = mongoose.model("ChatRoom", ChatRoomSchema);
export default ChatRoomModel;
