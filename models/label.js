const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Issue = require("./issue");

const labelSchema = new Schema(
  {
    label: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true }
);

labelSchema.pre("remove", async function (next) {
  try {
    var output = await Issue.updateMany(
      { labels: { $elemMatch: { $eq: mongoose.Types.ObjectId(this._id) } } },
      { $pull: { labels: mongoose.Types.ObjectId(this._id) } },
      { multi: true }
    );
    next();
  } catch (err) {
    next(err);
  }
});

const Label = mongoose.model("Label", labelSchema);
module.exports = Label;
