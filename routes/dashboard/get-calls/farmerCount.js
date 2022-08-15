module.exports = async (req, res) => {
  const Farmer = require("../../../models/farmer");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  try {
    var farmerCount = 0;
    farmerCount = await Farmer.find({}).countDocuments();
    res.statusCode = 200;
    res.send({ farmerCount: farmerCount });
  } catch (err) {
    res.statusCode = 500;
    res.send(err);
    console.log("err");
  }
};
