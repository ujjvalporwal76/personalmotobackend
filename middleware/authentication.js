import Jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken; // Authorization: 'Bearer TOKEN'

    if (!accessToken) {
      throw new Error("Authentication failed!, Provide valid Token");
    }
    const decodedToken = Jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);

    const userData = await UserModel.findOne({
      _id: decodedToken.userId,
    });
    // console.log(userData.email)
    if (!userData) {
      throw new Error("Invalid user");
    }

    req.token = accessToken;
    req.userData = userData;
    req.userId = userData._id;

    next();
  } catch (err) {
    res.status(401).json("Unauthorized:No token provided");
    console.log(err);
  }
};

export default authenticateUser;
