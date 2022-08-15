module.exports = (req, res) => {
  const Label = require("../../../models/label");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  Label.findByIdAndUpdate(req.body._id, { label: req.body.label })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
      console.log("err");
    });
};
