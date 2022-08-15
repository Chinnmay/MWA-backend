/*
Top 3 Problem identified each for top 10 crops with maximum issues
*/

module.exports = async (req, res) => {
  const Issue = require("../../../models/issue");
  const Problem = require("../../../models/problem");
  const Crop = require("../../../models/crop");
  var mongoose = require("mongoose");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  try {
    var output = {};
    // var problemName = await Problem.findById("6099518a42a36d290cf85cdc");
    var cropIDs = (await Issue.aggregate().sortByCount("cropID")).map((obj) => {
      return obj._id;
    });

    var cropCount = 0;
    for (var i = 0; i < cropIDs.length; i++) {
      var problemIDs = (await Issue.aggregate().match({ cropID: cropIDs[i] }).sortByCount("problemID")).map((obj) => {
        return obj._id;
      });

      var problemCount = 0;
      var problemNameArr = [];
      for (var j = 0; j < problemIDs.length; j++) {
        if (problemIDs[j]) {
          var problem = await Problem.find({ _id: problemIDs[j] });
          problemNameArr.push(problem[0].problemText);
          problemCount++;
        }
        if (problemCount >= 3)
          //top 3 problems
          break;
      }

      if (cropIDs[i] && problemNameArr.length > 0) {
        var crop = await Crop.find({ _id: cropIDs[i] });
        output[crop[0].crop] = problemNameArr;
        cropCount++;
      }
      if (cropCount >= 10)
        //top 10 crops
        break;
    }

    res.statusCode = 200;
    res.send(output);
  } catch (err) {
    res.statusCode = 500;
    res.send(err);
    console.log(err);
  }
};
