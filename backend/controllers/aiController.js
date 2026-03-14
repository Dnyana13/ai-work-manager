exports.generateTasks = async (req, res) => {

    try {

        const { prompt } = req.body;

        const taskTemplates = [
            "Analyze requirements for the project",
            "Design system architecture",
            "Create database schema",
            "Setup backend with Node.js and Express",
            "Implement authentication system",
            "Develop REST APIs",
            "Build frontend UI with React",
            "Integrate frontend with backend APIs",
            "Test application functionality",
            "Deploy application"
        ];

        const generatedTasks = taskTemplates.map(task => ({
            title: task,
            relatedTo: prompt
        }));

        res.json({
            prompt,
            tasks: generatedTasks
        });

    } catch (error) {

        res.status(500).json({
            message: "AI task generation failed"
        });

    }

};