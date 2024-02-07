import express from "express";
import paymentController from "../controllers/paymentController.js";
import bodyParser from "body-parser";
const paymentRoute = express.Router();

paymentRoute.post("/topup", paymentController.checkout);
paymentRoute.post("/points", paymentController.addpoints);
// paymentRoute.post(
//   "/webhook",
//   bodyParser.raw({ type: "application/json" }),
//   paymentController.webhook
// );
export default paymentRoute;
