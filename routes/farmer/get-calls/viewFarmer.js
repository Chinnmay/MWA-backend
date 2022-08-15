module.exports = (req, res) => {
    const Farmer = require("../../../models/farmer");
    // const crypto = require("crypto");
    // let accessTokenDetails;
    // if (req.body.accessTokenDetails) {
    //   accessTokenDetails = req.body.accessTokenDetails;
    //   delete req.body.accessTokenDetails;
    // }
    Farmer.find({ mobileNumber: req.params.mobileNumber })
      .then((result) => {
        res.statusCode = 200;
        res.send(result[0]);
      })
      .catch((err) => {
          res.statusCode = 500;
          res.send({error : err});
        console.log("err");
      });
  };
  