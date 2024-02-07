import express from "express";
import pagesController from "../controllers/pagesController.js";
import uploadMiddleware from "../middleware/multerUploader.js";

export var pagesRoutes = express.Router();

pagesRoutes.get("/myaccount-statistics", pagesController.statistics);
pagesRoutes.get("/myaccount-payments", pagesController.payments);
pagesRoutes.get("/myaccount-advertisements", pagesController.advertisements);
pagesRoutes.get("/myaccount-news", pagesController.news);
pagesRoutes.get("/myaccount-settings", pagesController.settings);

// pagesRoutes.get("/create-ad-page", pagesController.createadpage);

pagesRoutes.post(
  "/create-ad-page",
  uploadMiddleware,
  pagesController.createadpage
);

export default pagesRoutes;
