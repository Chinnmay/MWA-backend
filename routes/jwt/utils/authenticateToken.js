module.exports = (req, res, next) => {
  const jwt = require("jsonwebtoken");
  var authHeader = req.headers["authorization"];

  if (req.url.split("/").splice(-1)[0] === "login") {
    next();
  } else {
    if (!authHeader || authHeader === null) {
      res.sendStatus(401);
    } else {
      jwt.verify(authHeader, process.env.JWT_SECRET, (err, tokenDetails) => {
        if (err) {
          res.statusCode = 401;
          res.send(err);
        } else {
          req.body.accessTokenDetails = tokenDetails;
          next();
        }
      });
    }
  }
};
