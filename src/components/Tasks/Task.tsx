import React, { useState, useContext, FC } from "react";
import { Radio } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

// import components
import { TaskContext } from "../../context/TaskContext";
import { TaskContextType, ITask } from "../../context/TaskContext";

// import img
import unchecked from "../../img/unchecked_icon.svg";
import checked from "../../img/check_icon.svg";

const Task: FC<ITask> = (task) => {
  // useContext
  const {
    currentTask,
    updateTaskIsDone,
    updateTaskText,
    removeTask,
    updatePomosNo,
    updateCurrentTask,
  } = useContext(TaskContext) as TaskContextType;

  // useState
  const [taskText, setTaskText] = useState(task.task);
  const [pomosTodo, setPomosTodo] = useState(task.pomosNo);
  const [isDone, setisDone] = useState(task.isDone);
  const [isEdit, setIsEdit] = useState(false);

  /**handlers */
  const handleTaskChanged = (event: React.FormEvent<HTMLInputElement>) => {
    setTaskText(event.currentTarget.value);
    // updateTaskText(task.id, taskText);
  };

  const handleIsDoneChanged = () => {
    if (!isDone && currentTask === task.id) {
      updateCurrentTask(0);
    }
    updateTaskIsDone(task.id, !isDone);
    setisDone(!isDone);
  };

  const handleTaskRemoved = () => {
    if (window.confirm("Do you want to delete this task?")) removeTask(task.id);
  };

  const handleAddPomo = () => {
    if (isDone || !isEdit) return;

    setPomosTodo(pomosTodo + 1);
    // updatePomosNo(task.id, 1);
  };

  const handleRemovePomo = () => {
    if (isDone || !isEdit) return;

    if (pomosTodo === 0) return;

    setPomosTodo(pomosTodo - 1);
    // updatePomosNo(task.id, -1);
  };

  const handleCurrentTaskOnClick = (
    event: React.InputHTMLAttributes<HTMLInputElement>
  ) => {
    updateCurrentTask(task.id);
  };

  const handleSaveOnClick = () => {
    setIsEdit(!isEdit);

    updateTaskText(task.id, taskText);
    updatePomosNo(task.id, pomosTodo);
  };

  return (
    <div className="align-inline task-data">
      <div className="crnt-task">
        <Radio
          className="current-task-check"
          name="current"
          disabled={isDone}
          checked={currentTask === task.id}
          onChange={handleCurrentTaskOnClick}
        />
      </div>
      <div className="task-check not-done">
        <img
          src={isDone ? checked : unchecked}
          alt=""
          onClick={handleIsDoneChanged}
        />
      </div>
      <input
        className="task-txt"
        type="text"
        name="taskText"
        value={taskText}
        disabled={isDone || !isEdit}
        style={{ textDecoration: isDone ? "line-through" : "none" }}
        onChange={handleTaskChanged}
      />
      <div className="task-counter center align-inline">
        {/* n of completed pomos */}
        <span className="number">{task.completedPomosNo}</span>
      </div>
      <div className="pomodoro-counter center align-inline">
        <div className="number">/</div>
      </div>
      <div className="pomodoro-counter center align-inline">
        {/* n of scheduled pomos */}
        <span className="number">{pomosTodo}</span>
        <div
          className="counter-arrows"
          style={{ display: isEdit ? "block" : "none" }}
        >
          <div className="counter-arrow-up" onClick={handleAddPomo}></div>
          <div className="counter-arrow-down" onClick={handleRemovePomo}></div>
        </div>
      </div>
      <DeleteIcon
        className="del-task-btn"
        sx={{ display: isEdit ? "block" : "none" }}
        onClick={() => handleTaskRemoved()}
      />
      <EditIcon
        className="edit-btn"
        sx={{ display: isEdit ? "none" : "block" }}
        onClick={() => setIsEdit(!isEdit)}
      />
      <SaveIcon
        className="save-btn"
        style={{ display: isEdit ? "block" : "none" }}
        onClick={handleSaveOnClick}
      />
    </div>
  );
};

export default Task;
