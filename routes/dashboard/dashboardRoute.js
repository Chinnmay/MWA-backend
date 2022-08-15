var express = require("express");
var issueCount = require("./get-calls/issueCount");
var farmerCount = require("./get-calls/farmerCount");
var topProbsByMaxIssue = require("./get-calls/topProbsByMaxIssue");
var userDoneIssueCount = require("./get-calls/userDoneIssueCount");
var topProbsByDistrictWithMaxIssues = require("./get-calls/topProbsByDistrictWithMaxIssues");
var router = express.Router();

router.get("/issueCount/:status", function (req, res, next) {
  issueCount(req, res);
});

router.get("/topProbsByMaxIssue", function (req, res, next) {
  topProbsByMaxIssue(req, res);
});

router.get("/topProbsByDistrictWithMaxIssues", function (req, res, next) {
  topProbsByDistrictWithMaxIssues(req, res);
});

router.get("/farmerCount", function (req, res, next) {
  farmerCount(req, res);
});

router.get("/userDoneIssueCount", function (req, res, next) {
  userDoneIssueCount(req, res);
});

module.exports = router;
