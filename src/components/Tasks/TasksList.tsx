import React, { useContext } from "react";

// import components
import AddTask from "./AddTask";
import Task from "./Task";

import { TaskContext } from "../../context/TaskContext";
import { TaskContextType, ITask } from "../../context/TaskContext";
import {
  TimerModesContext,
  TimerModesContextType,
} from "../../context/TimerModesContext";

const TasksList = () => {
  const { tasks } = useContext(TaskContext) as TaskContextType;
  const { pomodoroMode } = useContext(
    TimerModesContext
  ) as TimerModesContextType;

  return (
    <section className={`${pomodoroMode} bg-tasks-list tasks-list`}>
      <div className="container center add-task">
        <div className="tasks-list-title center">Tasks</div>
        <AddTask />
      </div>
      <div className="tasks-grid">
        <span>Current task</span>
        {tasks.map((task: ITask) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              task={task.task}
              isDone={task.isDone}
              completedPomosNo={task.completedPomosNo}
              pomosNo={task.pomosNo}
            ></Task>
          );
        })}
      </div>
    </section>
  );
};

export default TasksList;
