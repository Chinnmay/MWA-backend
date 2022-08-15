module.exports = async (req, res) => {
  const Comment = require("../../../models/comment");
  var mongoose = require("mongoose");
  var accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }

  if (typeof req.body._id === "string") {
    req.body._id = mongoose.Types.ObjectId(req.body._id);
  }
  try {
    const editedComment = await Comment.findByIdAndUpdate(req.body._id, { comment: req.body.comment });
    res.statusCode = 200;
    res.send(editedComment);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.send(err);
  }
};
