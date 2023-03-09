const debug = require("debug")("app:Debug");
const authorizationError = function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    debug("<< 401 UNAUTHORIZED - Invalid Token");
    res.status(401).send("Invalid token");
  }
};

module.exports = { authorizationError };
