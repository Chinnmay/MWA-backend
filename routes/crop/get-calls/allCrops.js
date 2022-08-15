module.exports = async (req, res) => {
  const Crop = require("../../../models/crop");
  try {
    const crop = await Crop.find({}).populate({
      path: "categories",
      populate: {
        path: "problems"
      }
    });
    if (crop) {
      res.statusCode = 200;
      res.send(crop);
    } else {
      res.statusCode = 200;
      res.send({ Message: "No Crop Found" });
    }
  } catch (err) {
    res.statusCode = 500;
    console.log(err);
  }
};
