module.exports = async (req, res) => {
  const Issue = require("../../../models/issue");
  const User = require("../../../models/user");
  var mongoose = require("mongoose");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  try {
    var result = {};
    var users = await User.find({ role: "operator" });
    for (var i = 0; i < users.length; i++) {
      var userDoneCount = await Issue.find({
        status: "Done",
        assignee: mongoose.Types.ObjectId(users[i]._id)
      }).countDocuments();

      if (userDoneCount > 0) {
        result[users[i].fullName] = userDoneCount;
      } else {
        result[users[i].fullName] = 0;
      }
    }
    res.statusCode = 200;
    res.send(result);
  } catch (err) {
    res.statusCode = 500;
    res.send(err);
    console.log("err");
  }
};
