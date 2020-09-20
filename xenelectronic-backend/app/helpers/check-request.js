const responseError = require("./response-error");
const jwt = require("jsonwebtoken");

exports.headers = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(200).json(responseError(202));
    const decoded = jwt.verify(token, process.env.jwtKey);
    req.userData = decoded;    
    next();
  } catch (error) {
    console.log(error)
    if (error) return res.status(200).json(responseError(401));
  }
};
