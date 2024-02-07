import AdsModel from "../models/AdsModel.js"; // Import your Mongoose model

const searchAllAds = async (req, res) => {
  const allAds = await AdsModel.find({});

  res.json(allAds);
};
const searchfilterAds = async (req, res) => {
  console.log(req.body);
  console.log("req made");
  const filters = {
    bodyType: req.body.bodyType,
    vehicleBrand: req.body.vehicleBrand,
    vehicleModel: req.body.vehicleModel,
    price: {
      $gte: req.body.priceRange?.from || 0,
      $lte: req.body.priceRange?.to || Number.MAX_SAFE_INTEGER,
    },
    mileage: {
      $gte: req.body.mileageRange?.from || 0,
      $lte: req.body.mileageRange?.to || Number.MAX_SAFE_INTEGER,
    },
    productionYear: {
      $gte: req.body.yearRange?.from || 0,
      $lte: req.body.yearRange?.to || Number.MAX_SAFE_INTEGER,
    },
    fuelType: req.body.fuelType,
    sortFilter: req.body.sortFilter,
    damaged: req.body.damaged,
    // Add other filters as needed...
  };

  const query = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      query[key] = value;
    }
  });
  console.log(query);
  try {
    const ads = await AdsModel.find(query);
    res.json(ads);
  } catch (error) {
    console.error("Error fetching ads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { searchAllAds, searchfilterAds };
