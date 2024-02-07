import AdsModel from "../models/AdsModel.js";
import PointsModel from "../models/PointsModel.js";
import UserAdsModel from "../models/UserAdsModel.js";
import cron from "node-cron";
const currentDate = new Date();

// Calculate the end date of the plan
// const endDate = new Date(currentDate.setDate(currentDate.getDate() + 7));

// Schedule a cron job to run at midnight
const AdPlanAndPointsCron = cron.schedule("2 22 * * *", async () => {
  console.log("cron running");
  // Get all active ads
  const activeAds = await AdsModel.find({ status: "Active" });
  console.log(activeAds);
  // For each active ad, find the particular user and get its points from PointsModel
  for (const ad of activeAds) {
    console.log("run");
    const foundUser = await PointsModel.findOne({ userId: ad.userId });
    console.log(foundUser);
    const currentPoints = foundUser.points;
    console.log("Type of currentPoints:", typeof currentPoints);
    console.log("Type of ad.pointsPerDay:", typeof ad.pointsPerDay);
    if (Number.isNaN(currentPoints)) {
      console.error("currentPoints is NaN or not a number");
      // Handle the case where currentPoints is NaN, e.g., set a default value
    }
    console.log("currentPoints:" + currentPoints);
    // Check if the current points are less than the points per day
    if (currentPoints < ad.pointsPerDay) {
      // Change the status to pending
      console.log("if<");
      await AdsModel.updateOne(
        { _id: ad._id },
        { $set: { status: "Pending" } }
      );
      // Update the status in the UserAdsModel
      await UserAdsModel.updateOne(
        {
          userId: ad.userId,
          "ads.adId": ad._id,
        },
        {
          $set: {
            "ads.$.status": "Pending",
          },
        }
      );
    } else {
      // Update the points after deducting the points per day
      console.log("else>");
      const newPointsBalance = currentPoints - ad.pointsPerDay;
      console.log("newPoints:" + newPointsBalance);
      await PointsModel.updateOne(
        { userId: ad.userId },
        { $set: { points: newPointsBalance } }
      );
    }

    // Check if the adPlan has stopped
    if (ad.planEndDate <= currentDate) {
      console.log("if<date");
      // Change the status back to pending
      await AdsModel.updateOne(
        { _id: ad._id },
        { $set: { status: "Pending" } }
      );
      // Update the status in the UserAdsModel
      await UserAdsModel.updateOne(
        {
          userId: ad.userId,
          "ads.adId": ad._id,
        },
        {
          $set: {
            "ads.$.status": "Pending",
          },
        }
      );
      // Stop the cron job for that ad
      AdPlanAndPointsCron.stop();
    }
  }
});

export default { AdPlanAndPointsCron };
