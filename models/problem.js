const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema(
  {
    categoryID: {
      type: Schema.Types.ObjectId,
      ref: "Category"
    },
    problemText: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
