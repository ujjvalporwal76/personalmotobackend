import express from "express";
import updateController from "../controllers/updateController.js";
const updateRoute = express.Router();

updateRoute.post("/updatepassword", updateController.updatePassword);

updateRoute.post("/updatecontact", updateController.updateContact);
updateRoute.post("/updatebilling", updateController.updateBilling);
export default updateRoute;
