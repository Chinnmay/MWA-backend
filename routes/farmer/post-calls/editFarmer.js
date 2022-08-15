module.exports = (req, res) => {
  const Farmer = require("../../../models/farmer");
  // let accessTokenDetails;
  // if (req.body.accessTokenDetails) {
  //   accessTokenDetails = req.body.accessTokenDetails;
  //   delete req.body.accessTokenDetails;
  // }
  Farmer.findOneAndUpdate({ mobileNumber: req.body.mobileNumber }, req.body, { new: true }, (err, result) => {
    if (!err) {
      res.statusCode = 200;
      res.send({ message: "Farmer details updated successfully", result: result });
    } else {
      res.statusCode = 500;
      res.send(err);
    }
  });
};
