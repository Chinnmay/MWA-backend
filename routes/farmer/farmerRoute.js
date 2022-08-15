var express = require("express");
var searchFarmer = require("./post-calls/searchFarmer");
var addFarmer = require("./post-calls/addFarmer");
var viewFarmer = require("./get-calls/viewFarmer");
var editFarmer = require("./post-calls/editFarmer");
var router = express.Router();

router.post("/addFarmer", function (req, res, next) {
  addFarmer(req, res);
});

router.post("/searchFarmer", (req, res) => {
  searchFarmer(req, res);
});

router.post("/editFarmer", (req, res) => {
  editFarmer(req, res);
});

router.get("/viewFarmer/:mobileNumber", (req, res) => {
  viewFarmer(req, res);
});

module.exports = router;
