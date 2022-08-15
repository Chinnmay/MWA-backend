const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Issue = require("./issue");

const productSchema = new Schema(
  {
    product: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true }
);

productSchema.pre("remove", async function (next) {
  try {
    var output = await Issue.updateMany(
      { productsRecommended: { $elemMatch: { $eq: mongoose.Types.ObjectId(this._id) } } },
      { $pull: { productsRecommended: mongoose.Types.ObjectId(this._id) } },
      { multi: true }
    );
    next();
  } catch (err) {
    next(err);
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
