const { default: parseBearerToken } = require("parse-bearer-token");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
    const token = parseBearerToken(req);
    if (!token) return res.status(400).json({ err: "no bearer token" });
    jwt.verify(token, config.get("privateKey"), function (err, decoded) {
        if (err) return next(err);
        req.userId = decoded;
        next();
    });
};
