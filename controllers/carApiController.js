import axios from "axios";

const years = async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://carapi.app/api/years",
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const makes = async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://carapi.app/api/makes",
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const models = async (req, res) => {
  try {
    const selectedBrand = req.params.selectedBrand;
    const response = await axios({
      method: "GET",
      url: `https://carapi.app/api/models?year=2020&make=${selectedBrand}`,
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export default { years, makes, models };
