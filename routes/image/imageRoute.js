var express = require("express");
//var getProducts = require("./get-calls/getProducts");
var addImage = require("./post-calls/addImage");
var deleteImage = require("./delete-calls/deleteImage");
var router = express.Router();

router.post("/addImage", function (req, res, next) {
    addImage(req, res);
  });

router.delete("/deleteImage", function (req, res, next) {
    deleteImage(req, res);
  });

module.exports = router;
