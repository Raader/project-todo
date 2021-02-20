const express = require("express");
const controller = require("../controllers/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/login", (req, res) => {
    controller.login(req, res);
});

router.post("/register", (req, res) => {
    controller.register(req, res);
});

router.get("/", auth, (req, res) => {
    controller.get(req, res);
});
module.exports = router;
