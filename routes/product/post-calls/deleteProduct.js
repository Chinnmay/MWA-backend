module.exports = async (req, res) => {
  const Product = require("../../../models/product");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  var product = await Product.findById(req.body._id);
  if (product) {
    product
      .remove()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send(err);
        console.log("err");
      });
  }
};
