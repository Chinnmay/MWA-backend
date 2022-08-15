module.exports = (req, res) => {
  const User = require("../../../models/user");
  const crypto = require("crypto");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  User.find({ mobileNumber: req.params.mobileNumber })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("err");
    });
};
