const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Problem = require("./problem");

const categorySchema = new Schema(
  {
    cropID: {
      type: Schema.Types.ObjectId,
      ref: "Crop"
    },
    category: {
      type: String,
      required: true
    },
    problems: [
      {
        type: Schema.Types.ObjectId,
        ref: "Problem"
      }
    ]
  },
  { timestamps: true }
);

categorySchema.pre("remove", async function (next) {
  try {
    var output = await Problem.remove({
      _id: {
        $in: this.problems
      }
    });
    next();
  } catch (err) {
    next(err);
  }
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
