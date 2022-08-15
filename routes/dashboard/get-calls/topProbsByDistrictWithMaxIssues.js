/*
Top 5 districts from where maximum no. of issues are reported, its state and top 3 problems identified for each district
*/
module.exports = async (req, res) => {
  const Issue = require("../../../models/issue");
  const Problem = require("../../../models/problem");
  const Farmer = require("../../../models/farmer");
  var mongoose = require("mongoose");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  try {
    var output = [];
    const queryData = await Issue.find({})
      .populate("farmerID", { district: 1, state: 1 })
      .populate("problemID", "problemText")
      .select({ _id: 1 });

    //flattening the data
    var data = queryData.map((eachOut) => {
      if (eachOut.farmerID && eachOut.problemID) {
        return {
          district: eachOut.farmerID.district,
          state: eachOut.farmerID.state,
          problem: eachOut.problemID.problemText
        };
      }
    });
    //removing nulls
    data = data.filter(function (el) {
      return el != null;
    });

    var districtsCount = {};
    data.map((eachObj) => {
      if (districtsCount[eachObj.district]) {
        var c = districtsCount[eachObj.district];
        districtsCount[eachObj.district] = c + 1;
      } else {
        districtsCount[eachObj.district] = 1;
      }
    });

    //get aray of top districts which have max issues. Here 10 districts
    var topDistricts = Object.keys(
      Object.fromEntries(Object.entries(districtsCount).sort(([, a], [, b]) => b - a))
    ).slice(0, 10);

    for (var i = 0; i < topDistricts.length; i++) {
      var problemsCount = {};
      var district = topDistricts[i];
      var state = data.filter((eachObj) => {
        return eachObj.district === district;
      })[0].state;

      data
        .filter((eachObj) => {
          return eachObj.district === district;
        })
        .map((eachFiltered) => {
          if (problemsCount[eachFiltered.problem]) {
            var c = problemsCount[eachFiltered.problem];
            problemsCount[eachFiltered.problem] = c + 1;
          } else {
            problemsCount[eachFiltered.problem] = 1;
          }
        });

      //get aray of top problems per district. Here getting top 3 problems
      var topProblemsForDistrict = Object.keys(
        Object.fromEntries(Object.entries(problemsCount).sort(([, a], [, b]) => b - a))
      ).slice(0, 3);

      output.push({ district: district, state: state, topProblemsForDistrict: topProblemsForDistrict });
    }
    res.send(output);
  } catch (err) {
    res.statusCode = 500;
    res.send(err);
    console.log(err);
  }
};
