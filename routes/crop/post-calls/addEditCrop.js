module.exports = async (req, res) => {
  const Crop = require("../../../models/crop");
  const Category = require("../../../models/category");
  const Problem = require("../../../models/problem");
  var mongoose = require("mongoose");
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }
  try {
    var cropId = req.body._id;
    if (!cropId) {
      //crop exists
      const crop = new Crop({ crop: req.body.crop, categories: [] });
      var cropCreateResult = await crop.save();
      cropId = cropCreateResult.id;
    }
    var updatedCategoryIDs = [];
    if (req.body.categories && req.body.categories.length > 0) {
      for (var i = 0; i < req.body.categories.length; i++) {
        var cat = req.body.categories[i];
        if (cat._id) {
          //category already exists. Hence, it is edit category flow
          var updatedProblemIDs = [];
          if (cat.problems.length > 0) {
            for (var j = 0; j < cat.problems.length; j++) {
              var problem = cat.problems[j];
              if (problem._id) {
                //id exists. Hence, this is an edit problem

                var updatedProblem = await Problem.findOneAndUpdate(
                  { _id: mongoose.Types.ObjectId(problem._id) },
                  { problemText: problem.problemText }
                );
                updatedProblemIDs.push(mongoose.Types.ObjectId(problem._id));
              } else {
                //new problem, needs to be added
                const problemNew = new Problem({ categoryID: cat._id, problemText: problem.problemText });
                var problemCreateResult = await problemNew.save();
                updatedProblemIDs.push(mongoose.Types.ObjectId(problemCreateResult.id));
              }
            }
          }
          var updatedCategory = await Category.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(cat._id) },
            { category: cat.category, problems: updatedProblemIDs }
          );
          updatedCategoryIDs.push(mongoose.Types.ObjectId(cat._id));
        } else {
          //new category
          const category = new Category({ category: cat.category, cropID: cropId, problems: [] });
          var categoryCreateResult = await category.save();
          var problemIds = [];
          if (cat.problems) {
            for (var j = 0; j < cat.problems.length; j++) {
              var prob = cat.problems[j];
              const problem = new Problem({ categoryID: categoryCreateResult.id, problemText: prob.problemText });
              var problemCreateResult = await problem.save();
              problemIds.push(mongoose.Types.ObjectId(problemCreateResult.id));
            }
            var updatedCategory = await Category.findOneAndUpdate(
              { _id: categoryCreateResult.id },
              { problems: problemIds }
            );
          }
          updatedCategoryIDs.push(mongoose.Types.ObjectId(categoryCreateResult.id));
        }
      }
    }
    var updatedCrop = await Crop.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(cropId) },
      { categories: updatedCategoryIDs, crop: req.body.crop }
    );
    res.statusCode = 200;
    res.send(updatedCrop);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.send(err);
  }
};
