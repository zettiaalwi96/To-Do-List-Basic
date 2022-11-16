import React, { useState } from "react";
//import { CredentialContext } from "../../App";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EditTaskPopup = ({ modal, toggle, baseURL, updateTask, task }) => {
  //const [credentials] = useContext(CredentialContext);
  const [id] = useState(task._id);
  const [taskName, setTaskName] = useState(task.taskName);
  const [description, setDescription] = useState(task.description);

  //------------ STORE DATA IN LOCAL STORAGE INSTEAD TO DATABASE ----------
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "taskName") {
  //     setTaskName(value);
  //   } else {
  //     setDescription(value);
  //   }
  // };

  // To store data in local storage
  // useEffect(() => {
  //   setTaskName(taskObj.Name);
  //   setDescription(taskObj.Description);
  // }, []);

  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   let tempObj = {};
  //   tempObj["Name"] = taskName;
  //   tempObj["Description"] = description;
  //   updateTask(tempObj);
  // };
  //------------------------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(baseURL + "/Main/" + id, {
      method: "PUT",
      //Authorization: `Basic ${credentials.username}:${credentials.password}`,
      body: JSON.stringify({
        taskName,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        //console.log(task)
        updateTask(task);
        // setTaskName("");
        // setDescription("");
        toggle();
      });
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            id="taskName"
            //onChange={handleChange}
            onChange={(e) => setTaskName(e.target.value)}
            name="taskName"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            id="description"
            //onChange={handleChange}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          ></textarea>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Update
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTaskPopup;
