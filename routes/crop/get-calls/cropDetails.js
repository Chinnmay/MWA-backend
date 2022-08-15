module.exports = async (req, res) => {
  const Crop = require("../../../models/crop");
  var cropName = req.params.cropName;
  try {
    const crop = await Crop.findOne({ crop: cropName }).populate({
      path: "categories",
      model: "Category",
      populate: {
        path: "problems",
        model: "Problem"
      }
    });
    if (crop) {
      res.statusCode = 200;
      res.send(crop);
    } else {
      res.statusCode = 200;
      res.send({ Message: "Crop Not Found" });
    }
  } catch (err) {
    res.statusCode = 500;
    console.log(err);
  }
};
