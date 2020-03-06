const jwt = require("jsonwebtoken");
const secret = require("../secrets/secrets");

module.exports = (req, res, next) => {
  const token = req.headers.Authorization;

  // see if there is a token
  // check if it is valid => rehash header + payload + secret and see if it matches our verify signature

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log("failed verify", err);
        res.status(401).json({ message: "invalid token" });
      } else {
        // token is valid
        req.jwtToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "no token provided check restricted" });
  }
};
