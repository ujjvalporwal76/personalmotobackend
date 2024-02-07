import AdsModel from "../models/AdsModel.js";
import UserAdsModel from "../models/UserAdsModel.js";
import PointsModel from "../models/PointsModel.js";
const confirmAdPlan = async (req, res) => {
  const userId = req.userId;
  console.log(req.body);
  const { adId, column, plan, pointsPerDay, totalPoints } = req.body;
  const currentDate = new Date();

  // Calculate the end date of the plan
  const endDate = new Date(currentDate.setDate(currentDate.getDate() + plan));
  try {
    if (!adId || !column || !plan || !pointsPerDay || !totalPoints) {
      return res.status(403).send({ error: "Missing data" });
    } else {
      // check if the user has enough points to buy this ad
      const foundPoints = await PointsModel.findOne({ userId: userId });
      let currentPoints = 0;
      if (foundPoints) {
        currentPoints = foundPoints.points;
        console.log(currentPoints);
        if (currentPoints < totalPoints) {
          return res.status(401).json({ message: "Not Enough Points!" });
        }

        const foundAd = await AdsModel.findOne({
          _id: adId,
        });
        if (!foundAd) {
          return res.status(404).json({ message: "No such ad exists." });
        }
        await AdsModel.updateOne(
          { _id: foundAd._id },
          {
            $set: {
              status: "Active",
              adtype: column,
              plan: plan,
              pointsPerDay: pointsPerDay,
              planEndDate: endDate,
            },
          }
        );

        const foundUserAds = await UserAdsModel.findOne({
          userId: foundAd.userId,
          email: foundAd.email,
        });
        if (foundUserAds && foundUserAds.ads.length > 0) {
          // console.log(foundAd._id);
          for (let i = 0; i <= foundUserAds.ads.length - 1; i++) {
            if (foundUserAds.ads[i] && foundUserAds.ads[i].adId) {
              const foundUserAd = foundUserAds.ads[i].adId.equals(foundAd._id);
              // console.log(foundAd);
              if (foundUserAd) {
                await UserAdsModel.updateOne(
                  {
                    "ads.adId": adId,
                  },
                  {
                    $set: {
                      "ads.$.status": "Active",
                      "ads.$.adtype": column,
                      "ads.$.plan": plan,
                      "ads.$.pointsPerDay": pointsPerDay,
                      "ads.$.planEndDate": endDate,
                    },
                  }
                );
                console.log("Ad updated successfully");
                break; // Break out of the loop once the ad is updated
              }
            } else {
              continue;
            }
          }

          // Get the user's id and check if they have enough points to buy this ad
        } else {
          console.log("nothing");
        }
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export default { confirmAdPlan };
