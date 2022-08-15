var express = require("express");
var addIssue = require("./post-calls/addIssue");
var editIssue = require("./post-calls/editIssue");
var searchIssue = require("./post-calls/searchIssue");
var issueDetails = require("./get-calls/issueDetails");
var recommendedIssues = require("./post-calls/recommendedIssues");
var pendingIssues = require("./get-calls/pendingIssues");
var farmerCurrentIssues = require("./get-calls/farmerCurrentIssues");
var farmerPastIssues = require("./get-calls/farmerPastIssues");
var router = express.Router();

router.post("/addIssue", function (req, res, next) {
  addIssue(req, res);
});

router.post("/editIssue", function (req, res, next) {
  editIssue(req, res);
});

router.post("/searchIssue", function (req, res, next) {
  searchIssue(req, res);
});

router.get("/issueDetails/:issueCode", (req, res) => {
  issueDetails(req, res);
});

router.post("/recommendedIssues", (req, res) => {
  recommendedIssues(req, res);
});

router.get("/pendingIssues/:assignee", (req, res) => {
  pendingIssues(req, res);
});

router.get("/farmerCurrentIssues/:farmerID", (req, res) => {
  farmerCurrentIssues(req, res);
});

router.get("/farmerPastIssues/:farmerID", (req, res) => {
  farmerPastIssues(req, res);
});

module.exports = router;
