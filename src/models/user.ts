import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  join_date: { type: Date, default: new Date() },
  last_online: { type: Date, default: new Date() },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
