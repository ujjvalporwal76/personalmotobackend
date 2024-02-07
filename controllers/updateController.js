import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

const updatePassword = async (req, res) => {
  console.log(req.body);

  const { oldPassword, newPassword } = req.body;

  try {
    let user = await UserModel.findOne({ _id: req.userId });
    if (!user) {
      res.status(401).json({ msg: "No such user found" });
    }
    //check password is correct or not

    var validPass = await bcrypt.compareSync(oldPassword, user.password);

    if (!validPass) {
      res.status(400).json({ msg: "Password not valid" });
    } else {
      //update the password
      user.password = newPassword;
      await user.save();
      res.status(201).json({ msg: "password updated" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }

  console.log(req.userId);
};

const updateContact = async (req, res) => {
  console.log(req.body);
  const { county, postalCode, town, telephone } = req.body;
  try {
    let user = await UserModel.findOne({ _id: req.userId });
    if (user) {
      user.county = county || user.county;
      user.postalCode = postalCode || user.postalCode;
      user.town = town || user.town;
      user.telephone = telephone || user.telephone;
      await user.save();
      return res.status(201).send("contact details updated");
    }
    return res.status(400).send("error in update");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
};
const updateBilling = async (req, res) => {
  res.json({ message: "update Billing" });
};
export default { updatePassword, updateContact, updateBilling };
