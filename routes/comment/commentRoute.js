var express = require("express");
var router = express.Router();
var addComment = require("./post-calls/addComment");
var editComment = require("./post-calls/editComment");
router.post("/addComment", function (req, res, next) {
  addComment(req, res);
});
router.post("/editComment", function (req, res, next) {
  editComment(req, res);
});

module.exports = router;
