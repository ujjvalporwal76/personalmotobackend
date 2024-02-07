import mongoose from "mongoose";

const pointsSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  lastAmountPaid: {
    type: Number,
    required: true,
  },
  totalAmountPaid: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "pending",
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
    default: () => Date.now() + 365 * 24 * 60 * 60 * 1000,
  },
});

const PointsModel = new mongoose.model("Point", pointsSchema);

export default PointsModel;
