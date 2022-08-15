var express = require("express");
var addEditCrop = require("./post-calls/addEditCrop");
var cropDetails = require("./get-calls/cropDetails");
var allCrops = require("./get-calls/allCrops");
var router = express.Router();

router.post("/addEditCrop", function (req, res, next) {
  addEditCrop(req, res);
});

router.get("/details/:cropName", function (req, res, next) {
  cropDetails(req, res);
});
router.get("/allCrops", function (req, res, next) {
  allCrops(req, res);
});

module.exports = router;
