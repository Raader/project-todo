const router = require("express").Router();
const controller = require("../controllers/project");
const auth = require("../middleware/auth");

router.get("/:id", auth, function (req, res) {
    controller.get(req, res).catch((err) => {
        res.status(400).json({ err: err.message });
    });
});

router.post("/create", auth, function (req, res) {
    controller.create(req, res).catch((err) => {
        res.status(400).json({ err: err.message });
    });
});

router.get("/remove/:id", auth, function (req, res) {
    controller.remove(req, res).catch((err) => {
        res.status(400).json({ err: err.message });
    });
});

router.get("/list", auth, function (req, res) {
    controller.list(req, res).catch((err) => {
        res.status(400).json({ err: err.message });
    });
});

module.exports = router;
