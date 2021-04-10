const projectModel = require("../models/Project");
const mongoose = require("mongoose");

async function getProject(projectId, userId) {
    const project = await projectModel
        .findOne({
            _id: projectId,
            owner: userId,
        })
        .exec();
    if (!project) throw new Error("project not found");
    return { name: project.name, created: project.created, id: project.id };
}
async function createProject(name, userId) {
    const doc = new projectModel({
        name,
        owner: userId,
    });
    const project = await doc.save();
    return { name: project.name, created: project.created, id: project.id };
}

async function deleteProject(id, userId) {
    const project = await projectModel
        .findOneAndRemove(
            { _id: id, owner: userId },
            { useFindAndModify: false }
        )
        .exec();
    if (!project) throw new Error("project not found");
    return;
}

async function listProjects(userId) {
    const projects = await projectModel.find({ owner: userId }).exec();
    return projects.map((val) => {
        return { name: val.name, id: val.id, created: val.created };
    });
}
module.exports = { getProject, createProject, deleteProject, listProjects };
