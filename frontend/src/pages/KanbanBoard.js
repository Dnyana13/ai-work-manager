const fetchTasks = async () => {

  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      `http://localhost:5000/api/tasks/project/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setTasks(res.data);

  } catch (error) {

    console.error("Error fetching tasks", error);

  }

};