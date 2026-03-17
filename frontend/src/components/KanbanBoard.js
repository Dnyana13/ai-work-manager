import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const KanbanBoard = ({ projectId }) => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

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
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }

  };

  const onDragEnd = (result) => {

    if (!result.destination) return;

    const updatedTasks = tasks.map((task) => {

      if (task._id === result.draggableId) {
        return {
          ...task,
          status: result.destination.droppableId
        };
      }

      return task;

    });

    setTasks(updatedTasks);

  };

  const getTasks = (status) =>
    tasks.filter((task) => task.status === status);

  // ✅ IMPORTANT FIX: don't unmount DragDropContext
  if (loading) return <div>Loading tasks...</div>;

  return (

    <DragDropContext onDragEnd={onDragEnd}>

      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>

        {["todo", "inprogress", "done"].map((status) => (

          <Droppable key={status} droppableId={status}>
            {(provided) => (

              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  width: "30%",
                  minHeight: "300px",
                  background: "#f4f4f4",
                  padding: "10px",
                  borderRadius: "8px"
                }}
              >

                <h3>{status.toUpperCase()}</h3>

                {getTasks(status).map((task, index) => (

                  <Draggable
                    key={task._id}
                    draggableId={task._id.toString()} // ✅ FIX
                    index={index}
                  >

                    {(provided) => (

                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: "10px",
                          marginBottom: "10px",
                          background: "white",
                          borderRadius: "6px",
                          ...provided.draggableProps.style
                        }}
                      >

                        {task.title}

                      </div>

                    )}

                  </Draggable>

                ))}

                {provided.placeholder}

              </div>

            )}
          </Droppable>

        ))}

      </div>

    </DragDropContext>

  );

};

export default KanbanBoard;