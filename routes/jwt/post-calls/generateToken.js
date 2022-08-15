module.exports = (req, res) => {
    var generateTokenUtil = require('../utils/generateTokenUtil')
    const jwt = require('jsonwebtoken')

    var token = generateTokenUtil(req.body)
    res.send(token)
}