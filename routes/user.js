const express = require("express");
const controller = require("../controllers/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/login", (req, res) => {
    controller.login(req, res).catch((err) => {
        res.status(400).json({ err: err.message });
    });
});

router.post("/register", (req, res) => {
    controller.register(req, res).catch((err) => {
        res.status(400).json({ err: err.message });
    });
});

router.get("/", auth, (req, res) => {
    controller.get(req, res).catch((err) => {
        res.status(400).json({ err: err.message });
    });
});
module.exports = router;
