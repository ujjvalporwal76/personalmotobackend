import Jwt from "jsonwebtoken";
import UserModel from "../models/UserModule.js";

const refreshToken = (userId) => async () => {
  const user = await UserModel.findById(userId);

  const refreshToken = user.refreshToken;

  try {
    const decodedToken = Jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY
    );

    const accessToken = generateAccessToken(decodedToken);

    return accessToken;
  } catch (err) {
    return null;
  }
};

export default refreshToken;
