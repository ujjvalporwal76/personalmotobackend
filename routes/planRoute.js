import express from "express";
import planController from "../controllers/planController.js";
const planRoute = express.Router();

planRoute.post("/confirm", planController.confirmAdPlan);

export default planRoute;
