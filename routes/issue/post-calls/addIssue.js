module.exports = (req, res) => {
  var mongoose = require('mongoose');
  const Issue = require("../../../models/issue");
  const IssueCounter = require("../../../models/counter")
  
  console.log(req.body);
  IssueCounter.findOneAndUpdate({id: "issueCounter"}, {$inc: {seq: 1}}, {new: true})
  .then((count) => {
    req.body.issueCode = "MWA-"+count.seq.toString();
    const issue = new Issue(req.body);
    issue.save()
    .then((result) => {
        res.statusCode = 200;
        res.send({
          message: "Issue registered successfully",
          issue: result,
        });
    })
    .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.send({ Message: "Issue registration failed", error: err});
    })
  .catch((err) => {
    console.log(err);
    res.statusCode = 500;
    res.send({ Message: "Fetching IssueCode failed", error: err});
  });
  })
  
  
};
