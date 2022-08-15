module.exports = async (req, res) => {
  const User = require("../../../models/user");
  const crypto = require("crypto");
  try {
    var isAdmin = true;
    let tokenUserMobileNumber = req.body.accessTokenDetails.mobileNumber;
    if (tokenUserMobileNumber) {
      var tokenUser = await User.find({ mobileNumber: tokenUserMobileNumber });
      if (tokenUser[0] && tokenUser[0].role !== "admin") {
        isAdmin = false;
      }
    }
    if (req.body.accessTokenDetails) {
      accessTokenDetails = req.body.accessTokenDetails;
      delete req.body.accessTokenDetails;
    }
    if (isAdmin) {
      if (req.body.password) {
        req.body.password = crypto
          .pbkdf2Sync(req.body.password, process.env.PASSWORD_SECRET, 1000, 64, "sha512")
          .toString("hex");
      }
      var updatedUser = await User.findOneAndUpdate({ mobileNumber: req.body.mobileNumber }, req.body, { new: true });
      res.statusCode = 200;
      res.send({ message: "User details updated successfully", updatedUser: updatedUser });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.send(err);
  }
};
