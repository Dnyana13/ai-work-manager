import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import API from "../services/api";

import KanbanBoard from "../components/KanbanBoard";

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

      <KanbanBoard projectId={projectId} />

      

    </DashboardLayout>

  );
}

export default Tasks;