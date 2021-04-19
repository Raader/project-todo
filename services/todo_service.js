const todoModel = require("../models/Todo");

function formatTodoDoc(ndoc) {
    return {
        name: ndoc.name,
        description: ndoc.description,
        id: ndoc.id,
        completed: ndoc.completed,
        stats: ndoc.stats,
        created: ndoc.created,
        completed_date: ndoc.completed_date,
    };
}

async function addTodo(projectId, todo) {
    const doc = new todoModel({
        owner: projectId,
        name: todo.name,
        description: todo.description,
        stats: todo.stats,
    });
    const ndoc = await doc.save();

    return formatTodoDoc(ndoc);
}

async function listTodos(projectId) {
    const docs = await todoModel.find({ owner: projectId }).exec();
    if (!docs) throw new Error("no todos found");
    return docs.map((val) => {
        return formatTodoDoc(val);
    });
}

async function completeTodo(todoId) {
    const doc = await todoModel.findById(todoId).exec();
    if (!doc) throw new Error("todo not found");
    doc.completed = !doc.completed;
    doc.completed_date = Date.now();
    const ndoc = await doc.save();
    return formatTodoDoc(ndoc);
}

async function editTodo(todo) {
    const doc = await todoModel.findById(todo.id).exec();
    if (!doc) throw new Error("todo not found");
    if (todo.name) doc.name = todo.name;
    if (todo.description) doc.description = todo.description;
    if (todo.stats) {
        if (todo.stats.importance) doc.stats.importance = todo.stats.importance;
        if (todo.stats.time) doc.stats.time = todo.stats.time;
        if (todo.stats.difficulty) doc.stats.difficulty = todo.stats.difficulty;
    }
    const ndoc = await doc.save();
    return formatTodoDoc(ndoc);
}

async function deleteTodo(id) {
    const doc = await todoModel.findOneAndDelete({ _id: id }).exec();
    return;
}

module.exports = { addTodo, listTodos, completeTodo, editTodo, deleteTodo };
