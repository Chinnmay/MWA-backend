var express = require('express');
var generateToken=require('./post-calls/generateToken')
var router = express.Router();

router.post('/generateToken', function(req, res, next) {
  generateToken(req,res)
});

module.exports = router;
