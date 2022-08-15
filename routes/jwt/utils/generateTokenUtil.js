module.exports = (input) => {
  const jwt = require("jsonwebtoken");
  const accessToken = jwt.sign(input, process.env.JWT_SECRET, {
    expiresIn: "8h" //TODO: to discuss and fix on a time for token expiration
  });
  return { accessToken: accessToken };
};
