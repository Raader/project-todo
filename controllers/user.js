const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const privateKey = config.get("privateKey");
const userService = require("../services/user_service");

async function login(req, res) {
    const userR = req.body.user;
    const { user, token } = await userService.login(userR);
    res.json({ user, token, msg: "succesfully logged in user" });
}

async function register(req, res) {
    const userR = req.body.user;
    const { user, token } = await userService.register(userR);
    res.json({ user, token, msg: "succesfully registered user" });
}

async function get(req, res) {
    const id = req.userId;
    const { user } = await userService.get(id);
    res.json({ user, msg: "succesfully got user" });
}

module.exports = { login, register, get };
