import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: Date,
    expires: 1 * 86400, //1d
  },
});

const TokenModel = new mongoose.model("Token", tokenSchema);
export default TokenModel;
