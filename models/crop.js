const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cropSchema = new Schema(
  {
    crop: {
      type: String,
      unique: true
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category"
      }
    ]
  },
  { timestamps: true }
);

const Crop = mongoose.model("Crop", cropSchema);
module.exports = Crop;
