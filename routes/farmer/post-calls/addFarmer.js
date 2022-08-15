module.exports = (req, res) => {
    const Farmer = require("../../../models/farmer");
    const crypto = require("crypto");
    const generateTokenUtil = require("../../jwt/utils/generateTokenUtil");
    let accessTokenDetails;
    //console.log(req.body);
    const farmer = new Farmer(req.body.values);
  farmer
    .save()
    .then((result) => {
        res.statusCode = 200;
        res.send({
          message: "Farmer added successfully",
          farmer: result,
          accessToken: generateTokenUtil({ mobileNumber: req.body.mobileNumber })["accessToken"]
        });
    })
    .catch((err) => {
        console.log(err.code)
        console.log(err.keyValue.mobileNumber)
        if(err.code == 11000){
          res.statusCode = 200;
          res.send({ Message: "Mobile number already exists", error: err});
        }
        else{
          res.statusCode = 500;
          res.send({ Message: "Farmer creation failed", error: err});
        }
    });
  };
  