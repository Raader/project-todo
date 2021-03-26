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

async function deleteProject(id) {
    return projectModel
        .findByIdAndRemove(id, { useFindAndModify: false })
        .exec();
}

async function listProjects(userId) {
    const projects = await projectModel.find({ owner: userId }).exec();
    return projects.map((val) => {
        return { name: val.name, id: val.id };
    });
}
module.exports = { createProject, deleteProject, listProjects };