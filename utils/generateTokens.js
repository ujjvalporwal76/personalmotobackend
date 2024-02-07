import Jwt from "jsonwebtoken";
import TokenModel from "../models/TokenModel.js";

const generateTokens = async (user) => {
  try {
    const payload = { userId: user._id, email: user.email };
    const accessToken = Jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "30m",
    });

    const refreshToken = Jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: "2h",
    });

    const userToken = await TokenModel.findOne({ userId: user._id });
    console.log(userToken);
    if (userToken) {
      userToken.refreshToken = refreshToken;
      await userToken.save();
    } else {
      await new TokenModel({
        userId: user._id,
        refreshToken: refreshToken,
        email: user.email,
        createdAt: Date.now(),
      }).save();
    }

    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

export default generateTokens;
