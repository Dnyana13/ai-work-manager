const { GoogleGenerativeAI } = require("@google/generative-ai");
const Task = require("../models/Task");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateTasks = async (req, res) => {

  try {

    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

    const prompt = `
Generate 8 short software development tasks.
Return only a numbered list.
Example:
1. Setup database schema
2. Create login API
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const tasks = text
      .split("\n")
      .map(t =>
        t.replace(/^\d+\.\s*/, "")
          .replace(/\*\*/g, "")
          .trim()
      )
      .filter(t => t.length > 0);

    const savedTasks = [];

    for (let t of tasks) {

      const task = await Task.create({
        title: t,
        projectId: projectId,
        status: "todo"
      });

      savedTasks.push(task);

    }

    res.json({
      message: "AI Tasks Created Successfully",
      tasks: savedTasks
    });

  } catch (error) {

    console.error("AI ERROR:", error);

    res.status(500).json({
      message: "AI task generation failed",
      error: error.message
    });

  }

};