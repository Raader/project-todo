const todoModel = require("../models/Todo");

async function addTodo(projectId, todo) {
    const doc = new todoModel({
        owner: projectId,
        name: todo.name,
        description: todo.description,
    });
    const ndoc = await doc.save();

    return {
        todo: { name: ndoc.name, description: ndoc.description, id: ndoc.id },
    };
}

module.exports = { addTodo };
