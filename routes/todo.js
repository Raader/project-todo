const router = require("express").Router();
const controller = require("../controllers/todo");
const auth = require("../middleware/auth");
const select = require("../middleware/select_project");

router.post("/add", auth, select, function (req, res) {
    controller.add(req, res).catch((err) => {
        res.status(400).json({ err: err.message });
    });
});

router.post("/list", auth, select, function (req, res) {
    controller.list(req, res).catch((err) => {
        res.status(400).json({ err: err.message });
    });
});

router.post("/complete", auth, select, function (req, res) {
    controller.complete(req, res).catch((err) => {
        res.status(400).json({ err: err.message });
    });
});

router.post("/edit", auth, select, function (req, res) {
    controller.edit(req, res).catch((err) => {
        res.status(400).json({ err: err.message });
    });
});

router.post("/remove", auth, select, function (req, res) {
    controller.remove(req, res).catch((err) => {
        res.status(400).json({ err: err.message });
    });
});

module.exports = router;
