const todoModel = require("../models/Todo");

async function addTodo(projectId, todo) {
    const doc = new todoModel({
        owner: projectId,
        name: todo.name,
        description: todo.description,
        stats: todo.stats,
    });
    const ndoc = await doc.save();

    return {
        name: ndoc.name,
        description: ndoc.description,
        id: ndoc.id,
        completed: ndoc.completed,
        stats: ndoc.stats,
        created: ndoc.created,
    };
}

async function listTodos(projectId) {
    const docs = await todoModel.find({ owner: projectId }).exec();
    if (!docs) throw new Error("no todos found");
    return docs.map((val) => {
        return {
            name: val.name,
            description: val.description,
            id: val.id,
            completed: val.completed,
            stats: val.stats,
            created: val.created,
        };
    });
}

async function completeTodo(todoId) {
    const doc = await todoModel.findById(todoId).exec();
    if (!doc) throw new Error("todo not found");
    doc.completed = !doc.completed;
    const ndoc = await doc.save();
    return {
        name: ndoc.name,
        description: ndoc.description,
        id: ndoc.id,
        completed: ndoc.completed,
        stats: ndoc.stats,
        created: ndoc.created,
    };
}

module.exports = { addTodo, listTodos, completeTodo };
