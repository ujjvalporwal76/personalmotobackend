import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: String,
  postalCode: String,
  town: String,
  telephone: String,
});
userSchema.set("timestamps", true);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    //            console.log(`Password is modified`);
    const hashedPassword = bcrypt.hashSync(this.password, saltRounds);
    this.password = hashedPassword;
  }
  next();
});

const UserModel = new mongoose.model("User", userSchema);
export default UserModel;
