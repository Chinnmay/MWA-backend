var express = require("express");
var getLabels = require("./get-calls/getLabels");
var addLabel = require("./post-calls/addLabel");
var editLabel = require("./post-calls/editLabel");
var deleteLabel = require("./post-calls/deleteLabel");
var router = express.Router();

router.get("/getLabels", function (req, res, next) {
  getLabels(req, res);
});

router.post("/addLabel", function (req, res, next) {
  addLabel(req, res);
});
router.post("/editLabel", function (req, res, next) {
  editLabel(req, res);
});

router.post("/deleteLabel", function (req, res, next) {
  deleteLabel(req, res);
});
module.exports = router;
