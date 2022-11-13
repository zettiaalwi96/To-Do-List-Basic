import React, { useState } from "react";
import EditTaskPopup from "./EditTask";

const Card = ({index, task, baseURL, updateTask, deleteTask }) => {
  const [modal, setModal] = useState(false);

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  const toggle = () => {
    setModal(!modal);
  };

  //------------ STORE DATA IN LOCAL STORAGE INSTEAD TO DATABASE ----------
  // const updateTask = (obj) => {
  //   updateListArray(obj, index);
  // };

  // const handleDelete = () => {
  //   deleteTask(index);
  // };
  //------------------------------------------------------------------------

  return (
    <div className="card-wrapper mr-5">
      <div
        className="card-top"
        style={{ backgroundColor: colors[index % 5].primaryColor }}
      ></div>
      <div className="task-holder">
        <span
          className="card-header"
          style={{
            backgroundColor: colors[index % 5].secondaryColor,
            borderRadius: "10px",
          }}
        >
          {task.taskName}
        </span>
        <p className="mt-3">{task.description}</p>

        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          <i
            className="far fa-edit"
            style={{
              color: colors[index % 5].primaryColor,
              cursor: "pointer",
              margin: "0 15px",
            }}
            onClick={() => setModal(true)}
          ></i>
          <i
            className="fas fa-trash-alt"
            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
            onClick={() => deleteTask(task._id)}
          ></i>
        </div>
      </div>
      <EditTaskPopup
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        // taskObj={taskObj}
        task={task}
        baseURL={baseURL}
      />
    </div>
  );
};

export default Card;
