import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./db/mongoConnection.js";
import authRoute from "./routes/authRoute.js";
import pagesRoutes from "./routes/pagesRoute.js";
import authenticateUser from "./middleware/authentication.js";
import tokenRouter from "./routes/tokenRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import productRoute from "./routes/productRoute.js";
import updateRoute from "./routes/updateRoute.js";
import planRoute from "./routes/planRoute.js";
import carApiRoute from "./routes/carapiRoute.js";
import AdPlanAndPointsCron from "./utils/cron.js";
import searchRoute from "./routes/searchRoute.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const corsOptions = {
  origin: "https://personalmoto.netlify.app/",
  // origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
  // "Access-Control-Allow-Origin": "*"
  // " Access-Control-Expose-Headers": "Authorization",
};

app.use(cors(corsOptions));
app.use("/api/carapi", carApiRoute);
app.use("/api/search", searchRoute);
app.use("/api/users", authRoute);
app.use("/api/product", productRoute);
app.use("/api/allproducts", productRoute);
app.use("/api/refresh", tokenRouter);
app.use(authenticateUser);
app.use("/api/pages", pagesRoutes);
app.use("/api/pay", paymentRoute);
app.use("/api/update", updateRoute);
app.use("/api/plans", planRoute);

connectToDatabase().then(() => console.log("Connected to MongoDB"));
AdPlanAndPointsCron;
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
