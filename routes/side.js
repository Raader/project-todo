const router = require("express").Router();
const auth = require("../middleware/auth");
const select = require("../middleware/select_project");
const todoService = require("../services/todo_service");

router.post("/list", auth, select, async function (req, res) {
    try {
        const todo = req.body.todo;
        if (!todo || !todo.id) throw new Error("not enough creds");
        const list = await todoService.listTodos(todo.id);
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
        const doc = await todoService.addTodo(todo.id, side);
        res.json({
            side: doc,
            msg: "succesfully added side task to todo",
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

router.post("/complete", auth, select, async function (req, res) {
    try {
        const todo = req.body.todo;
        const side = req.body.side;
        if (!todo || !todo.id || !side) throw new Error("not enough creds");
        const doc = await todoService.completeTodo(side.id);
        res.json({
            side: doc,
            msg: "sucscesfully compelted todo",
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

router.post("/edit", auth, select, async function (req, res) {
    try {
        const todo = req.body.todo;
        const side = req.body.side;
        if (!todo || !todo.id || !side) throw new Error("not enough creds");
        const doc = await todoService.editTodo(side);
        res.json({
            side: doc,
            msg: "succesfully edited side task of todo",
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

router.post("/remove", auth, select, async function (req, res) {
    try {
        const todo = req.body.todo;
        const side = req.body.side;
        if (!todo || !todo.id || !side) throw new Error("not enough creds");
        const doc = await todoService.deleteTodo(side.id);
        res.json({
            msg: "succesfully deleted side task",
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

module.exports = router;
