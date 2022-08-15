module.exports = (req, res) => {
  const Label = require("../../../models/label");
  const crypto = require("crypto");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  const label = new Label(req.body);
  label
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.statusCode = 500;
      console.log(err);
      res.send(err);
    });
};
