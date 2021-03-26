const todoService = require("../services/todo_service");

async function add(req, res) {
    const todo = req.body.todo;
    if (!todo) throw new Error("no todo found");
    const todoDoc = await todoService.addTodo(req.project.id, todo);
    res.json({ todo: todoDoc, msg: "succesfully added todo to the project" });
}

async function complete(req, res) {}

async function edit(req, res) {}

async function remove(req, res) {}

module.exports = { add, complete, edit, remove };