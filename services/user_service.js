const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const privateKey = config.get("privateKey");

function sign(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, privateKey, function (err, token) {
            if (err) return reject(err);
            resolve(token);
        });
    });
}

async function register(user) {
    const doc = await userModel.saveUser(user);
    const token = await sign({ id: doc.id });
    return { user: { name: doc.name, email: doc.email, id: doc.id }, token };
}

async function login(user) {
    const doc = await new Promise((resolve, reject) => {
        userModel.findUser(user.email, user.password, (err, doc) => {
            if (err) return reject(err);
            resolve(doc);
        });
    });
    const token = await sign({ id: doc.id });
    return { user: { name: doc.name, email: doc.email, id: doc.id }, token };
}

async function get(id) {
    const doc = await new Promise((resolve, reject) => {
        userModel.findUserById(id, (err, doc) => {
            if (err) return reject(err);
            resolve(doc);
        });
    });
    return { user: { name: doc.name, email: doc.email, id: doc.id } };
}

module.exports = { register, login, get };
