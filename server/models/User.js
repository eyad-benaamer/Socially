import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      uniqe: true,
      max: 20,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 50,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);
const Uesr = model("Uesr", UserSchema);
export default User;
