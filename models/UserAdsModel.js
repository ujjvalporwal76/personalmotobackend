import mongoose from "mongoose";

const UserAdsSchema = new mongoose.Schema({
  email: String,
  userId: mongoose.Schema.Types.ObjectId,
  ads: [
    {
      adId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ad",
      },
      adtype: String,
      category: String,
      status: String,
      productType: String,
      damaged: String,
      imported: String,
      vin: String,
      mileage: String,
      registration: String,
      registrationDate: String,
      showRegistrationCheck: String,
      productionYear: String,
      vehicleBrand: String,
      vehicleModel: String,
      fuelType: String,
      power: String,
      displacement: String,
      doors: String,
      gearBox: String,
      version: String,
      bodyType: String,
      color: String,
      ytVideo: String,
      title: String,
      description: String,
      netPrice: String,
      price: String,
      currency: String,
      sellerName: String,
      postalCode: String,
      telephone: String,
      freeVerificationCheck: String,
      images: Array,
      plan: Number,
      pointsPerDay: {
        type: Number,
        min: 0,
        precision: 2,
      },
      planEndDate: Date,
    },
  ],
});

UserAdsSchema.set("timestamps", true);
const UserAdsModel = new mongoose.model("userad", UserAdsSchema);

export default UserAdsModel;
