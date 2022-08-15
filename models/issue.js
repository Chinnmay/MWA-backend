const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema(
  {
    issueCode: {
      type: String,
      required: true,
      unique: true
    },
    farmerID: {
      type: Schema.Types.ObjectId,
      ref: "Farmer",
      required: true
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String
    },
    issueType: {
      type: String,
      required: true,
      enum: ["Crop Related", "Other", "Soil Related", "Fertilizer Management"],
      default: "Crop Related"
    },
    cropID: {
      type: Schema.Types.ObjectId,
      ref: "Crop"
    },
    categoryID: {
      type: Schema.Types.ObjectId,
      ref: "Category"
    },
    problemID: {
      type: Schema.Types.ObjectId,
      ref: "Problem"
    },
    productsRecommended: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product"
      }
    ],
    labels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Label"
      }
    ],
    description: {
      type: String
    },
    status: {
      type: String,
      required: true,
      enum: ["New", "In Progress", "On Hold", "SolutionProvided", "Done", "Rejected", "In Follow Up"],
      default: "New"
    },
    paid: {
      type: Boolean,
      default: false
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image"
      }
    ],
    solutionprovided: {
      type: String
    },
    marketstaff: {
      type: String
    }
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue;
