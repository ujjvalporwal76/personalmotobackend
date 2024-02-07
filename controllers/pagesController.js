import AdsModel from "../models/AdsModel.js";
import UserAdsModel from "../models/UserAdsModel.js";
import UserModel from "../models/UserModel.js";
import PointsModel from "../models/PointsModel.js";

const statistics = async (req, res) => {
  const userData = req.userData;
  const userId = req.userId;
  try {
    const foundPoints = await PointsModel.findOne({ userId: userId });
    if (foundPoints) {
      let points = foundPoints.points;
      console.log(points);
      return res
        .status(200)
        .json({ message: "Success", points: points, userData: userData });
    } else {
      return res
        .status(200)
        .json({ message: "Success", points: 0, userData: userData });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      error: "No Points Found",
    });
  }
};

const advertisements = async (req, res) => {
  const userData = req.userData;
  const userId = req.userId;

  try {
    const foundPoints = await PointsModel.findOne({ userId: userId });
    if (foundPoints) {
      let points = foundPoints.points;
      console.log(points);
      return res
        .status(200)
        .json({ message: "Success", points: points, userData: userData });
    } else {
      return res
        .status(200)
        .json({ message: "Success", points: 0, userData: userData });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      error: "No Points Found",
    });
  }
};
const payments = async (req, res) => {
  const userData = req.userData;
  const userId = req.userId;

  try {
    const foundPoints = await PointsModel.findOne({ userId: userId });
    if (foundPoints) {
      let points = foundPoints.points;
      console.log(points);
      return res
        .status(200)
        .json({ message: "Success", points: points, userData: userData });
    } else {
      return res
        .status(200)
        .json({ message: "Success", points: 0, userData: userData });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      error: "No Points Found",
    });
  }
};
const news = async (req, res) => {
  const userData = req.userData;

  const userId = req.userId;

  try {
    const foundPoints = await PointsModel.findOne({ userId: userId });
    if (foundPoints) {
      let points = foundPoints.points;
      console.log(points);
      return res
        .status(200)
        .json({ message: "Success", points: points, userData: userData });
    } else {
      return res
        .status(200)
        .json({ message: "Success", points: 0, userData: userData });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      error: "No Points Found",
    });
  }
};
const settings = async (req, res) => {
  const userData = req.userData;
  const userId = req.userId;

  const foundPoints = await PointsModel.findOne({ userId: userId });
  if (foundPoints) {
    let points = foundPoints.points;
    console.log(points);
    return res
      .status(200)
      .json({ message: "Success", points: points, userData: userData });
  } else {
    return res
      .status(200)
      .json({ message: "Success", points: 0, userData: userData });
  }
};
const createadpage = async (req, res) => {
  if (!req.userData) {
    return res.status(401).json("not logged in for ad");
  }
  let adId;
  const {
    productType,
    damaged,
    imported,
    category,
    vin,
    mileage,
    registration,
    registrationDate,
    showRegistrationCheck,
    productionYear,
    vehicleBrand,
    vehicleModel,
    fuelType,
    power,
    displacement,
    doors,
    gearBox,
    version,
    bodyType,
    color,
    ytVideo,
    title,
    description,
    netPrice,
    price,
    currency,
    sellerName,
    postalCode,
    telephone,
    freeVerificationCheck,
  } = req.body;
  const images = req.files.map((file) => {
    return file.filename;
  });
  console.log(req.body);
  console.log(
    req.files.map((file) => {
      return file.filename;
    })
  );
  try {
    const userExist = await UserModel.findOne({ _id: req.userId });

    if (userExist) {
      // console.log(userExist._id);
      // console.log(req.userId);

      const newAd = new AdsModel({
        userId: req.userData._id,
        email: req.userData.email,
        status: "Pending",
        productType,
        damaged,
        category,
        imported,
        vin,
        mileage,
        registration,
        registrationDate,
        showRegistrationCheck,
        productionYear,
        vehicleBrand,
        vehicleModel,
        fuelType,
        power,
        displacement,
        doors,
        gearBox,
        version,
        bodyType,
        color,
        ytVideo,
        title,
        description,
        netPrice,
        price,
        currency,
        sellerName,
        postalCode,
        telephone,
        freeVerificationCheck,
        images,
      });
      adId = newAd._id;
      console.log(newAd._id);
      await newAd.save();

      const userAdExist = await UserAdsModel.findOne({
        userId: userExist._id,
        email: userExist.email,
      });
      // console.log(userAdExist);
      if (userAdExist) {
        // Check to make sure that the userAdExist variable is not null.
        if (userAdExist.ads) {
          userAdExist.ads.push({
            adId: adId,
            status: "Pending",
            productType,
            damaged,
            imported,
            category,
            vin,
            mileage,
            registration,
            registrationDate,
            showRegistrationCheck,
            productionYear,
            vehicleBrand,
            vehicleModel,
            fuelType,
            power,
            displacement,
            doors,
            gearBox,
            version,
            bodyType,
            color,
            ytVideo,
            title,
            description,
            netPrice,
            price,
            currency,
            sellerName,
            postalCode,
            telephone,
            freeVerificationCheck,
            images,
          });
        }

        await userAdExist.save();
        res
          .status(201)
          .json({ message: "submitted in existed ad", adId: adId });
      } else {
        const newUserAd = new UserAdsModel({
          userId: req.userData._id,
          email: req.userData.email,
          ads: [
            {
              adId: adId,
              status: "Pending",
              productType,
              damaged,
              imported,
              category,
              vin,
              mileage,
              registration,
              registrationDate,
              showRegistrationCheck,
              productionYear,
              vehicleBrand,
              vehicleModel,
              fuelType,
              power,
              displacement,
              doors,
              gearBox,
              version,
              bodyType,
              color,
              ytVideo,
              title,
              description,
              netPrice,
              price,
              currency,
              sellerName,
              postalCode,
              telephone,
              freeVerificationCheck,
              images,
            },
          ],
        });

        await newUserAd.save();
        res.status(201).json({ message: "New ad created", adId: adId });
      }
    } else {
      throw "User not found";
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  statistics,
  createadpage,
  payments,
  news,
  payments,
  settings,
  advertisements,
};
