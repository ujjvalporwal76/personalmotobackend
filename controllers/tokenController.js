import Jwt from "jsonwebtoken";
import TokenModel from "../models/TokenModel.js";

const handleRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "No cookie found for refresh token" });
  }

  console.log("refreshToken :" + refreshToken);

  const foundToken = await TokenModel.findOne({
    refreshToken: refreshToken,
  });

  console.log("foundToken: " + foundToken);

  if (!foundToken) {
    return res
      .status(403)
      .json({ message: "no token found refresh token maybe expired" });
  }

  Jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
    if (err) {
      return res.status(403).json({ message: "refresh Token not verified" });
    }
    const accessToken = Jwt.sign(
      { userId: foundToken.userId, email: foundToken.email },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "30s" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 5 * 1000 * 60 * 60,
      sameSite: "none",
      secure: "false",
    });
    res.json({ accessToken });
  });
};

export default { handleRefreshToken };
