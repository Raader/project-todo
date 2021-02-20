const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const privateKey = config.get("privateKey");

function login(req, res) {
    const user = req.body.user;
    User.findUser(user.email, user.password, (err, doc) => {
        if (err) return res.status(400).json({ err });
        jwt.sign({ id: doc.id }, privateKey, (err, token) => {
            if (err) return res.status(400).json({ err });
            res.json({
                user: { name: doc.name, email: doc.email, id: doc.id },
                token,
                msg: "succesfully logged in user",
            });
        });
    });
}

function register(req, res) {
    const user = req.body.user;
    User.saveUser(user, (err, doc) => {
        if (err) return res.status(400).json({ err });
        jwt.sign({ id: doc.id }, privateKey, (err, token) => {
            if (err) return res.status(400).json({ err });
            res.json({
                user: { name: doc.name, email: doc.email, id: doc.id },
                token,
                msg: "succesfully registered user",
            });
        });
    });
}

function get(req, res) {
    const id = req.userId;
    User.findUserById(id, function (err, doc) {
        if (err) return res.status(400).json({ err });
        res.json({
            user: { name: doc.name, email: doc.email, id: doc.id },
            msg: "succesfully got user",
        });
    });
}

module.exports = { login, register, get };
