var express = require("express");
var getDetails = require("./get-calls/getDetails");
var getUsers = require("./get-calls/getUsers");
var login = require("./post-calls/login");
var addUser = require("./post-calls/addUser");
var editUser = require("./post-calls/editUser");
var router = express.Router();

router.get("/details/:mobileNumber", (req, res) => {
  getDetails(req, res);
});

router.get("/getUsers", (req, res) => {
  getUsers(req, res);
});

router.post("/login", function (req, res, next) {
  login(req, res);
});

router.post("/adduser", function (req, res, next) {
  addUser(req, res);
});

router.post("/editUser", function (req, res, next) {
  editUser(req, res);
});
module.exports = router;
