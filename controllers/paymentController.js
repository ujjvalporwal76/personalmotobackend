import stripe from "../utils/stripe.js";
import PointsModel from "../models/PointsModel.js";
import UserModel from "../models/UserModel.js";
import calculatePoints from "../utils/calculatePoints.js";
import crypto from "crypto";
const checkout = async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    postalCode,
    email,
    phoneNumber,
    toPay,
  } = req.body;
  console.log(req.body);
  // function generateRandom32BitString() {
  //   const buffer = crypto.randomBytes(32);
  //   return buffer.toString("hex");
  // }
  // const string = generateRandom32BitString();
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: {
              name: "TopUp Funds",
              metadata: {
                firstName,
                lastName,
                address,
                postalCode,
                email,
                phoneNumber,
              },
            },
            unit_amount: toPay * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment/success?id={CHECKOUT_SESSION_ID}&email=${email}&paid=${toPay}`,
      cancel_url: `${process.env.CLIENT_URL}/payment/fail`,
    });

    res.status(201).json({ url: session.url });
    console.log(session.id);
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
};
const addpoints = async (req, res) => {
  console.log(req.body);
  const transactionId = req.body.transactionId;
  const email = req.body.email;
  const toPay = Number(req.body.paid);

  const session = await stripe.checkout.sessions.retrieve(transactionId);

  console.log(session);

  if (session.payment_status === "paid" && session.status === "complete") {
    const getPoints = calculatePoints(toPay);

    console.log(Number(getPoints));
    try {
      const founduser = await UserModel.findOne({ email: email });

      if (founduser) {
        // Check if the user already has a points record.
        console.log(founduser);
        const userPointExist = await PointsModel.findOne({
          userId: founduser._id,
        });

        if (userPointExist) {
          // Update the user's points record.
          console.log("yes exist");
          const foundTxnId = await PointsModel.findOne({
            transactionId: transactionId,
          });
          if (foundTxnId) {
            console.log("txn exist");
            return res
              .status(409)
              .json({ message: "Points was already added" });
          }
          await PointsModel.updateOne(
            { userId: founduser._id },
            {
              $set: {
                transactionId: transactionId,
                email: email,
                points: userPointExist.points + getPoints,
                lastAmountPaid: toPay,
                totalAmountPaid: userPointExist.totalAmountPaid + toPay,
                paymentStatus: "Complete",
                expiryDate: Date.now() + 365 * 24 * 60 * 60 * 1000,
              },
            }
          );
          res.status(201).json({ message: "submitted in existed points" });
        } else {
          // Create a new points record for the user.
          console.log("no exist");
          await PointsModel.create({
            transactionId: transactionId,
            userId: founduser._id,
            email: email,
            points: getPoints,
            lastAmountPaid: toPay,
            totalAmountPaid: toPay,
            paymentStatus: "Complete",
            expiryDate: Date.now() + 365 * 24 * 60 * 60 * 1000,
          });
          res.status(201).json({ message: "New points added" });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: "Error in adding points" });
    }
  } else {
    return res.status(500).json({ message: "Error in adding points" });
  }
};

export default { checkout, addpoints };
