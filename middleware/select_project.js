const projectModel = require("../models/Project");

module.exports = function (req, res, next) {
    const project = req.body.project;
    if (!project || !project.id)
        return res.status(400).json({ err: "no project found" });
    projectModel.findById(project.id, function (err, doc) {
        if (err) return res.status(400).json({ err: err.message });
        if (!doc) return res.status(400).json({ err: "no project found" });
        if (doc.owner != req.userId)
            return res
                .status(400)
                .json({ err: "user is not the project owner" });
        req.project = doc;
        next();
    });
};
