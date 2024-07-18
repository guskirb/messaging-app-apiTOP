import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { DateTime } from "luxon";

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    join_date: { type: Date, default: Date.now() },
    last_online: { type: Date, default: Date.now() },
    image: {
      type: String,
      default:
        "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

UserSchema.virtual("last_online_formatted").get(function () {
  const timeNow = DateTime.fromJSDate(this.last_online).diffNow().as("minutes");
  if (timeNow < -10) {
    return DateTime.fromJSDate(this.last_online).toRelative();
  } else {
    return "online";
  }
});

UserSchema.virtual("friend_count").get(function () {
  return this.friends.length;
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
