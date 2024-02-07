import express from "express";
import carApiController from "../controllers/carApiController.js";

const carApiRoute = express.Router();

carApiRoute.get("/years", carApiController.years);
carApiRoute.get("/makes", carApiController.makes);
carApiRoute.get("/models/:selectedBrand", carApiController.models);

export default carApiRoute;
