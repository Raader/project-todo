const projectModel = require("../models/Project");
const mongoose = require("mongoose");

async function createProject(name, userId) {
    const doc = new projectModel({
        name,
        owner: userId,
    });
    const project = await doc.save();
    return { name: project.name, created: project.created, id: project.id };
}

module.exports = { createProject };
