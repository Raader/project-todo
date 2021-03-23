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

async function remove(req, res) {
    const id = req.params.id;
    if (!id) throw new Error("no id given");
    await projectService.deleteProject(id);
    res.json({ msg: "succesfully deleted project" });
}

async function list(req, res) {
    const projects = await projectService.listProjects(req.userId);
    res.json({ projects, msg: "succeesfully listed projects" });
}
module.exports = { get, create, remove, list };
