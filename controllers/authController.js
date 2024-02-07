import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import generateTokens from "../utils/generateTokens.js";

const register = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!email || !password || !userName) {
    return res.status(401).json({ message: "Please provide all fields" });
  }

  try {
    const userExist = await UserModel.findOne({ email: email });
    if (!userExist) {
      let newUser = new UserModel({
        userName: userName,
        email: email,
        password: password,
      });

      await newUser.save();

      res.status(201).json({ message: "user registered successfully" });
    } else {
      res.status(422).json({ message: "Email already exist" });
    }
  } catch (e) {
    console.error(e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "Please provide email and password" });
  }
  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      // console.log("validpassword:" + validPassword);
      if (validPassword) {
        const { accessToken, refreshToken } = await generateTokens(user);
        console.log(accessToken, refreshToken);
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 5 * 1000 * 60 * 60,
          sameSite: "none",
          secure: "false",
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 5 * 1000 * 60 * 60,
          sameSite: "none",
          secure: "false",
        });
        return res.status(200).json({
          accessToken,
          refreshToken,
          message: "Logged in Successfully",
        });
      }
    }
    return res.status(400).json("wrong credentials");
  } catch (e) {
    console.error(e);
  }
};

const logout = async (req, res) => {
  if (req.cookies.accessToken || req.cookies.refreshToken) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json("user logout");
  } else {
    res.redirect("/api/users/login");
  }
};

export default { register, login, logout };
