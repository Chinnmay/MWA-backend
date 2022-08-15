var express = require("express");
var getProducts = require("./get-calls/getProducts");
var addProduct = require("./post-calls/addProduct");
var editProduct = require("./post-calls/editProduct");
var deleteProduct = require("./post-calls/deleteProduct");
var router = express.Router();

router.get("/getProducts", function (req, res, next) {
  getProducts(req, res);
});

router.post("/addProduct", function (req, res, next) {
  addProduct(req, res);
});

router.post("/editProduct", function (req, res, next) {
  editProduct(req, res);
});

router.post("/deleteProduct", function (req, res, next) {
  deleteProduct(req, res);
});
module.exports = router;
