const projectModel = require("../models/Project");
const mongoose = require("mongoose");

function parseProjectDoc(doc) {
    return {
        name: doc.name,
        description: doc.description,
        created: doc.created,
        id: doc.id,
    };
}

async function getProject(projectId, userId) {
    const project = await projectModel
        .findOne({
            _id: projectId,
            owner: userId,
        })
        .exec();
    if (!project) throw new Error("project not found");
    return parseProjectDoc(project);
}
async function createProject(userId, project) {
    const doc = new projectModel({
        name: project.name,
        description: project.description,
        owner: userId,
    });
    const ndoc = await doc.save();
    return parseProjectDoc(ndoc);
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
        return parseProjectDoc(val);
    });
}
module.exports = { getProject, createProject, deleteProject, listProjects };
