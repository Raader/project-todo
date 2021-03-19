const projectService = require("../services/project_service");

async function get(req, res) {
    res.status(200);
}

async function create(req, res) {
    const name = req.body.project.name;
    if (!name) throw new Error("project has no name");
    const project = await projectService.createProject(name, req.userId);
    res.json({ project, msg: "successfully created project" });
}

async function remove(req, res) {}

module.exports = { get, create, remove };
