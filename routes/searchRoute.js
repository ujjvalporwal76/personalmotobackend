import express from "express";
import searchController from "../controllers/searchController.js";
const searchRoute = express.Router();

searchRoute.post("/filters", searchController.searchfilterAds);
searchRoute.get("/allads", searchController.searchAllAds);
export default searchRoute;
