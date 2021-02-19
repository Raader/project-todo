const express = require("express");
const controller = require("../controllers/user");

const router = express.Router();

router.post("/login", (req, res) => {
    controller.login(req, res);
});

router.post("/register", (req, res) => {
    controller.register(req, res);
});

router.get("/", (req, res) => {});
module.exports = router;
