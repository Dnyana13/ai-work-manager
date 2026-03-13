const Project = require("../models/Project");


// CREATE PROJECT
exports.createProject = async (req, res) => {

    try {

        const { title, description } = req.body;

        const project = await Project.create({
            title,
            description,
            owner: req.user.id
        });

        res.status(201).json(project);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


// GET USER PROJECTS
exports.getProjects = async (req, res) => {

    try {

        const projects = await Project.find({ owner: req.user.id });

        res.json(projects);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


// UPDATE PROJECT
exports.updateProject = async (req, res) => {

    try {

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(project);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


// DELETE PROJECT
exports.deleteProject = async (req, res) => {

    try {

        await Project.findByIdAndDelete(req.params.id);

        res.json({ message: "Project deleted" });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};