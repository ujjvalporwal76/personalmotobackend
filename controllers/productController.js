import AdsModel from "../models/AdsModel.js";
import mongoose from "mongoose";

const productDetailsShow = async (req, res) => {
  console.log(req.params.productId);
  const productId = new mongoose.Types.ObjectId(req.params.productId);
  try {
    const foundAd = await AdsModel.findOne({ _id: productId });
    if (foundAd) {
      return res.status(200).send(foundAd);
    } else {
      throw new Error("No Product Found");
    }
  } catch (error) {
    console.log("Error in getting the details of a specific product", error);
    res.status(500).json({ message: "Server Error!" });
  }
};

const allProductDetails = async (req, res) => {
  try {
    // Extract the 'category' query parameter from the request
    const { category } = req.query;
    console.log("category:" + category);
    // Create a query object to filter by category if provided
    const query = category ? { category } : {};
    console.log("query:" + JSON.stringify(query));
    const adsList = await AdsModel.find(query);
    // console.log(adsList);
    if (!adsList) {
      throw new Error("No products");
    }
    res.status(200).send(adsList);
  } catch (err) {
    console.log("Error in fetching all products", err);
    res.status(404).send();
  }
};
export default { productDetailsShow, allProductDetails };
