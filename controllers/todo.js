const todoService = require("../services/todo_service");

async function add(req, res) {
    const todo = req.body.todo;
    if (!todo) throw new Error("no todo found");
    const todoDoc = await todoService.addTodo(req.project.id, todo);
    res.json({ todo: todoDoc, msg: "succesfully added todo to the project" });
}

async function complete(req, res) {
    const todo = req.body.todo;
    if (!todo) throw new Error("no todo found");
    const todoDoc = await todoService.completeTodo(todo.id);
    res.json({ todo: todoDoc, msg: "succesfull completed todo" });
}

async function edit(req, res) {
    const todo = req.body.todo;
    if (!todo) throw new Error("no todo found");
    const todoDoc = await todoService.editTodo(todo);
    res.json({ todo: todoDoc, msg: "succesfull edited todo" });
}

async function remove(req, res) {
    const todo = req.body.todo;
    if (!todo && !todo.id) throw new Error("no todo found");
    await todoService.deleteTodo(todo.id);
    res.json({ msg: "succesfully deleted todo" });
}

async function list(req, res) {
    const todos = await todoService.listTodos(req.project.id);
    res.json({ todos, msg: "succesfully listed todos" });
}

module.exports = { add, complete, edit, remove, list };
