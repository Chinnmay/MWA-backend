module.exports = async (req, res) => {
  const User = require("../../../models/user");
  const crypto = require("crypto");
  let accessTokenDetails;
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
    req.body.password = crypto
      .pbkdf2Sync(req.body.password, process.env.PASSWORD_SECRET, 1000, 64, "sha512")
      .toString("hex");
    const user = new User(req.body);
    user
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log("err");
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
};
