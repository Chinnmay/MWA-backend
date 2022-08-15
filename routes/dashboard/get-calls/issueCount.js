module.exports = async (req, res) => {
  const Issue = require("../../../models/issue");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  try {
    var issueCount = 0;
    issueCount = await Issue.find({ status: req.params.status }).countDocuments();
    res.statusCode = 200;
    res.send({ count: issueCount });
  } catch (err) {
    res.statusCode = 500;
    res.send(err);
    console.log("err");
  }
};
