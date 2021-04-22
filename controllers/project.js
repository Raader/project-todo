const projectService = require("../services/project_service");

async function get(req, res) {
    const projectId = req.params.id;
    const project = await projectService.getProject(projectId, req.userId);
    res.json({ project, msg: "succesfully got project" });
}

async function create(req, res) {
    const p = req.body.project;
    if (!p.name) throw new Error("project has no name");
    const project = await projectService.createProject(req.userId, p);
    res.json({ project, msg: "successfully created project" });
}

async function remove(req, res) {
    const id = req.params.id;
    if (!id) throw new Error("no id given");
    await projectService.deleteProject(id, req.userId);
    res.json({ msg: "succesfully deleted project" });
}

async function list(req, res) {
    const projects = await projectService.listProjects(req.userId);
    res.json({ projects, msg: "succeesfully listed projects" });
}

async function edit(req, res) {
    const project = req.body.project;
    if (!project || !project.id) throw new Error("no project given");
    const np = await projectService.editProject(project, req.userId);
    res.json({ project: np, msg: "succesfully edited project" });
}
module.exports = { get, create, remove, list, edit };
