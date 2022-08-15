module.exports = (req, res) => {
  var Product = require("../../../models/product");
  const crypto = require("crypto");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  Product.find({})
    .sort("product")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.statusCode = 500;
      console.log("err");
    });
};
