const router = require("express").Router();
const auth = require("../middleware/auth");
const select = require("../middleware/select_project");
const todo_service = require("../services/todo_service");

router.post("/list", auth, select, async function (req, res) {
    try {
        const todo = req.body.todo;
        if (!todo || !todo.id) throw new Error("not enough creds");
        const list = await todo_service.listTodos(todo.id);
        res.json({
            sides: list,
            msg: "succesfully listed sides",
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

router.post("/add", auth, select, async function (req, res) {
    try {
        const todo = req.body.todo;
        const side = req.body.side;
        if (!todo || !todo.id || !side) throw new Error("not enough creds");
        const doc = await todo_service.addTodo(todo.id, side);
        res.json({
            side: doc,
            msg: "succesfully added side task to todo",
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

router.post("/edit", auth, select, function (req, res) {});

router.post("/remove", auth, select, function (req, res) {});

module.exports = router;
