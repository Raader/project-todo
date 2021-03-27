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

async function listTodos(projectId) {
    const docs = await todoModel.find({ owner: projectId }).exec();
    if (!docs) throw new Error("no todos found");
    return docs.map((val) => {
        return { name: val.name, description: val.description, id: val.id };
    });
}

module.exports = { addTodo, listTodos };
