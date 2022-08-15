module.exports = async (req, res) => {
  const Label = require("../../../models/label");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  var label = await Label.findById(req.body._id);
  if (label) {
    label
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
