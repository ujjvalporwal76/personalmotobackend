import express from "express";
import productController from "../controllers/productController.js";
const productRoute = express.Router();

productRoute.get("/:productId", productController.productDetailsShow);
productRoute.get("/", productController.allProductDetails);
export default productRoute;
