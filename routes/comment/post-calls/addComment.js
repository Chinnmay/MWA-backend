module.exports = async (req, res) => {
  const Comment = require("../../../models/comment");
  const Issue = require("../../../models/issue");
  var mongoose = require("mongoose");
  var accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }

  //checking if issueID is a string, converting it into Mongooose Object ID
  if (typeof req.body.issueID === "string") {
    req.body.issueID = mongoose.Types.ObjectId(req.body.issueID);
  }
  if (typeof req.body.commentBy === "string") {
    req.body.commentBy = mongoose.Types.ObjectId(req.body.commentBy);
  }
  try {
    const comment = new Comment(req.body);
    var savedComment = await comment.save();

    //adding comment id in issue schema
    const issue = await Issue.findById(req.body.issueID);
    issue.comments.push(mongoose.Types.ObjectId(savedComment._id));
    await issue.save();

    res.statusCode = 200;
    res.send(savedComment);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.send(err);
  }
};
