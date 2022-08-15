var express = require("express");
var router = express.Router();

const User = require("../../models/user");
const Farmer = require("../../models/farmer");
const Issue = require("../../models/issue");
const Crop = require("../../models/crop");
const Category = require("../../models/category");
const Problem = require("../../models/problem");
const Image = require("../../models/image");
const Comment = require("../../models/comment");
//This api are just temporary ones to create data to play around, these mainly use the required fileds to save data, other fields have default values or are not required

//Create a user using only mandatory fields
router.get("/api/addUser", (req, res) => {
  const user = new User({
    fullName: "Chinmay Chaudhari",
    emailID: "c@g.com",
    mobileNumber: "7588888155",
    password: "anmol",
    role: "admin"
  });
  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

router.get("/api/addFarmer", (req, res) => {
  const farmer = new Farmer({
    fullName: "Ram Khandelwal",
    mobileNumber: "7599999155",
    townVillage: "loni kalbhor",
    district: "pune",
    state: "maharshtra",
    previousCropsCultivated: ["wheat"],
    currentCropsCultivated: ["cotton"]
  });

  farmer
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

router.get("/api/addCrop", (req, res) => {
  const crop = new Crop({
    crop: "Wheat"
  });
  crop
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

router.get("/api/addCategory", (req, res) => {
  const category = new Category({
    cropID: "60994ffe8956be10dc383857",
    category: "Big crop"
  });
  category
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

router.get("/api/addProblem", (req, res) => {
  const problem = new Problem({
    categoryID: "6099506070ea1d3650c40f75",
    problemText: "Mota eating crops"
  });
  problem
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

router.get("/api/addIssue", (req, res) => {
  const issue = new Issue({
    issueCode: "MWA-1",
    farmerID: "60994d269f6b8f4f849c8582",
    reporter: "60994c148cf99232a46dd082",
    assignee: "60994c148cf99232a46dd082",
    title: "wheat getting eaten by anmol kahndelwal",
    cropID: "60994ffe8956be10dc383835",
    categoryID: "6099506070ea1d3650c40f75",
    problemID: "6099518a42a36d290cf85cdc"
  });

  issue
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

router.get("/api/allUsers", (req, res) => {
  Farmer.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("err");
    });
});

router.get("/api/allFarmerIssues", (req, res) => {
  Farmer.find({ fullName: "Ram Khandelwal" })
    .then((result) => {
      Issue.find({ farmerID: result[0]["id"] }).then((issueResult) => {
        res.send(issueResult);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
