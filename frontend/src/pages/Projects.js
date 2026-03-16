import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Projects() {


  const navigate = useNavigate();


  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");

  const getProjects = async () => {

    const res = await API.get("/projects");

    setProjects(res.data);

  };

  const createProject = async () => {

    await API.post("/projects", { title });

    setTitle("");

    getProjects();

  };

  useEffect(() => {

    getProjects();

  }, []);

  
  const generateAITasks = async (projectId) => {

  try {

    await API.post("/ai/generate-tasks", {
      projectId: projectId
    });

    alert("AI Tasks Created Successfully");

  } catch (error) {
    console.log(error);
    alert("AI Task generation failed");
  }

};


  return (

    <DashboardLayout>

      <h2>Create Project</h2>

      <input
        placeholder="Project Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createProject}>
        Create
      </button>

      <h2>Your Projects</h2>
      
      {projects.map((p) => (

  <div key={p._id} style={{border:"1px solid #ccc", padding:"10px", margin:"10px"}}>

    <h3>{p.title}</h3>

    <button onClick={async () => {

      await generateAITasks(p._id);

      navigate(`/tasks/${p._id}`);

    }}>
      Generate AI Tasks
    </button>

  </div>

))}

    </DashboardLayout>

  );
}

export default Projects;