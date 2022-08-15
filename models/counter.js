const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counterSchema = new Schema(
  {
    id: {
      type: String,
      unique: true
    },
    seq: 
      {
        type: Number,
      }
  },
  { timestamps: true }
);

const Counter = mongoose.model("counter", counterSchema);
module.exports = Counter;
