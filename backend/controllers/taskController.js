const Task = require("../models/Task");


// CREATE TASK
exports.createTask = async (req, res) => {

    try {

        const { title, description, priority, project } = req.body;

        const task = await Task.create({
            title,
            description,
            priority,
            project,
            owner: req.user.id
        });

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


// GET TASKS BY PROJECT
exports.getTasksByProject = async (req, res) => {

    try {

        const tasks = await Task.find({
            projectId: req.params.projectId,
        });

        res.json(tasks);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


// UPDATE TASK
exports.updateTask = async (req, res) => {

    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(task);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


// DELETE TASK
exports.deleteTask = async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.json({ message: "Task deleted" });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};