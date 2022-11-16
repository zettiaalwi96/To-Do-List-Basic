import React, { useState} from "react";
//import { CredentialContext } from "../../App";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateTaskPopup = ({ modal, toggle, baseURL, handleAddTask }) => {
  //const [credentials] = useContext(CredentialContext);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const userId = localStorage.getItem("userId")

  //------------ STORE DATA IN LOCAL STORAGE INSTEAD TO DATABASE ----------
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "taskName") {
  //     setTaskName(value);
  //   } else {
  //     setDescription(value);
  //   }
  // };

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   let taskObj = {};
  //   taskObj["Name"] = taskName;
  //   taskObj["Description"] = description;
  //   save(taskObj);
  // };
  //------------------------------------------------------------------------



  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(baseURL + "/Main", {
      method: "POST",
      //Authorization: `Basic ${credentials.username}:${credentials.password}`,
      body: JSON.stringify({
        userId,
        taskName,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        handleAddTask(resJson)
      })
      .then(() => {
        setTaskName("");
        setDescription("");
        toggle();
      });
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            // onChange={handleChange}
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
            // onChange={handleChange}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          ></textarea>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Create
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTaskPopup;
