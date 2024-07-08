import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  join_date: { type: Date, default: new Date() },
  last_online: { type: Date, default: new Date() },
  image: {
    type: String,
    default: "https://static.scrum.org/web/images/profile-placeholder.png",
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
