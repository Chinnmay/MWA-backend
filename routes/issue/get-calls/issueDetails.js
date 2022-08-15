module.exports = (req, res) => {
  const Farmer = require("../../../models/farmer");
  const Issue = require("../../../models/issue");
  const Product = require("../../../models/product");
  const Label = require("../../../models/label");
  // const crypto = require("crypto");
  // let accessTokenDetails;
  // if (req.body.accessTokenDetails) {
  //   accessTokenDetails = req.body.accessTokenDetails;
  //   delete req.body.accessTokenDetails;
  // }
  Issue.findOne({ issueCode: req.params.issueCode })
    .populate({
      path: "productsRecommended",
      model: Product,
    })
    .populate({
      path: "labels",
      model: Label,
    })
    .populate("farmerID")
    .populate("images")
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "commentBy",
        model: "User"
      }
    })
    .populate("reporter", "fullName")
    .populate("assignee", "fullName")
    .populate("cropID", "crop")
    .populate("categoryID", "category")
    .populate("problemID", "problemText")
    .then((issue) => {
      res.statusCode = 200;
      res.send({ issue });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send({ error: err });
      console.log(err);
      console.log("Issue error");
    });
};
