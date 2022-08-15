module.exports = (req, res) => {
  const User = require("../../../models/user");
  const crypto = require("crypto");
  const generateTokenUtil = require("../../jwt/utils/generateTokenUtil");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  User.find({ mobileNumber: req.body.mobileNumber })
    .then((result) => {
      if (result[0].password.length > 0) {
        if (result[0].status && result[0].status === "inactive") {
          res.statusCode = 401;
          res.send({ Message: "User Inactive" });
        }
        if (req.body.password === result[0].password) {
          res.statusCode = 200;
          res.send({
            message: "Login success",
            user: result[0],
            accessToken: generateTokenUtil({ mobileNumber: req.body.mobileNumber })["accessToken"]
          });
        } else {
          res.statusCode = 401;
          res.send({ Message: "Login failed" });
        }
      }
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(JSON.stringify(err));
    });
};
