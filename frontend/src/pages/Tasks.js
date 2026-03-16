import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import API from "../services/api";

function Tasks() {

  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await API.get(`/tasks/project/${projectId}`);
    setTasks(res.data);
  };

  const completeTask = async (id) => {
    await API.put(`/tasks/${id}`, { status: "completed" });
    getTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (

    <DashboardLayout>

      <h2>Project Tasks</h2>

      {tasks.map((task) => (

        <div key={task._id} style={{border:"1px solid #ccc",padding:"10px",margin:"10px"}}>

          <h4>{task.title}</h4>
          <p>Status: {task.status}</p>

          <button onClick={()=>completeTask(task._id)}>
            Mark Complete
          </button>

          <button style={{marginLeft:"10px"}} onClick={()=>deleteTask(task._id)}>
            Delete
          </button>

        </div>

      ))}

    </DashboardLayout>

  );
}

export default Tasks;