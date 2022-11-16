import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscColorMode } from "react-icons/vsc";
import { AppContext } from "../darkMode/darkMode";
import CreateTaskPopup from "./CreateTask";
import Card from "./Card";

let baseURL = "http://localhost:3001";

const MainPage = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  //const [task] = useState({});
  const {toggleDarkMode} = useContext(AppContext);

  // To display the username on the header
  const username = localStorage.getItem("username");
  console.log(username);

  // To display the username on the header
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const toggle = () => {
    setModal(!modal);
  };

  //------------ STORE DATA IN LOCAL STORAGE INSTEAD TO DATABASE ----------
  // const saveTask = (taskObj) => {
  //   let tempList = taskList;
  //   tempList.push(taskObj);
  //   localStorage.setItem("taskList", JSON.stringify(tempList));
  //   setTaskList(taskList);
  //   setModal(false);
  // };

  //   // To save data in local storage
  // useEffect(() => {
  //   let arr = localStorage.getItem("taskList");

  //   if (arr) {
  //     let obj = JSON.parse(arr);
  //     setTaskList(obj);
  //   }
  // }, []);

  // const deleteTask = (index) => {
  //   let tempList = taskList;
  //   tempList.splice(index, 1);
  //   localStorage.setItem("taskList", JSON.stringify(tempList));
  //   setTaskList(tempList);
  //   window.location.reload();
  // };

  // const updateListArray = (obj, index) => {
  //   let tempList = taskList;
  //   tempList[index] = obj;
  //   localStorage.setItem("taskList", JSON.stringify(tempList));
  //   setTaskList(tempList);
  //   window.location.reload();
  // };

  //------------------------------------------------------------------------

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getTask = () => {
    fetch(`${baseURL}/Main/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then(
        (data) => {
          return data.json();
        },
        (err) => console.log(err)
      )
      .then(
        (parsedData) => {
          setTaskList(parsedData);
        },
        (err) => console.log(err)
      );
  };
  useEffect(() => {
    getTask();
  }, []);

  const handleAddTask = (newTask) => {
    const currentTask = [...taskList];
    currentTask.push(newTask);
    //console.log(newTask)
    setTaskList(currentTask);
  };

  const deleteTask = (id) => {
    fetch(baseURL + "/Main/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    }).then((response) => {
      const findIndex = taskList.findIndex((task) => task._id === id);
      const exisitingTask = [...taskList];
      exisitingTask.splice(findIndex, 1);
      setTaskList(exisitingTask);
    });
  };

  const updateTask = (updatedTask) => {
    //console.log(updatedTask)
    const currentTasks = [...taskList];
    const findIndex = currentTasks.findIndex(
      (currentTask) => currentTask._id === updatedTask._id
    );
    currentTasks[findIndex] = updatedTask;
    setTaskList(currentTasks);
    console.log(taskList);
  };

  return (
    <div>
      <div className="header">
        <div className="greetings">
          <h6> Hello {username}, welcome ! </h6>
          <h3>TO DO LIST</h3>
        </div>
        <div>
          <button className="btn btn-warning" onClick={() => setModal(true)}>
            Create Task
          </button>
          {username && (
            <button className="btn btn-danger logout" onClick={logout}>
              Logout
            </button>
          )}
          <button
            onClick={toggleDarkMode}
            className="save"
          >
            <VscColorMode />
          </button>
        </div>
      </div>

      <div style={{ textAlign: "left", margin: "2rem 8rem 0" }}>
        <h4>All Task</h4>
      </div>

      <div className="task-container">
        {taskList &&
          taskList.map((task, index) => (
            <Card
              key={index}
              // taskObj={obj}
              task={task}
              index={index}
              deleteTask={deleteTask}
              // updateListArray={updateListArray}
              baseURL={baseURL}
              updateTask={updateTask}
            />
          ))}
      </div>
      <CreateTaskPopup
        toggle={toggle}
        modal={modal}
        baseURL={baseURL}
        handleAddTask={handleAddTask}
      />
    </div>
  );
};

export default MainPage;
