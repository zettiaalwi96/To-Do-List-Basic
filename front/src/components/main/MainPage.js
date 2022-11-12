import React, { useContext, useEffect, useState } from "react";
import { CredentialContext } from "../../App";

import CreateTaskPopup from "./CreateTask";
import Card from "./Card";

const MainPage = () => {
  const [credentials] = useContext(CredentialContext);
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(taskList);
    setModal(false);
  };

    // To save data in local storage
  useEffect(() => {
    let arr = localStorage.getItem("taskList");

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = taskList;
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const updateListArray = (obj, index) => {
    let tempList = taskList;
    tempList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  //   const toggle = () => {
  //     setModal(!modal);
  //   };

  //   const saveTask = (taskObj) => {
  //     let tempList = taskList;
  //     tempList.push(taskObj);
  //     localStorage.setItem("taskList", JSON.stringify(tempList));
  //     setTaskList(taskList);
  //     setModal(false);
  //   };

  return (
    <div>
      <div>
        <h1> Hello {credentials && credentials.username} </h1>
      </div>

      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>

      <div style={{ "text-align": "left", margin: "2rem 8rem 0" }}>
        <h4>All Task</h4>
      </div>

      <div className="task-container">
        {taskList &&
          taskList.map((obj, index) => (
            <Card
              key={index}
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
            />
          ))}
      </div>
      <CreateTaskPopup toggle={toggle} modal={modal} save={saveTask} />
    </div>
  );
};

export default MainPage;
