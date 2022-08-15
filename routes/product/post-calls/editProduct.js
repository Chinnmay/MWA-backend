module.exports = (req, res) => {
  const Product = require("../../../models/product");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  Product.findByIdAndUpdate(req.body._id, { product: req.body.product })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
      console.log("err");
    });
};
