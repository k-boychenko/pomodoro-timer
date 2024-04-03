/* eslint-disable array-callback-return */
import React, { useState, createContext, FC } from "react";

export interface ITask {
  id: number;
  task: string;
  isDone: boolean;
  completedPomosNo: number;
  pomosNo: number;
}

interface Props {
  children?: React.ReactNode;
}

export type TaskContextType = {
  tasks: ITask[];
  lastId: number;
  currentTask: number;
  addTask: (newTask: string) => void;
  updateTaskIsDone: (id: number, isDone: boolean) => void;
  updateTaskText: (id: number, task: string) => void;
  removeTask: (taskId: number) => void;
  clearTasks: () => void;
  updateCompletedPomosNo: (id: number) => void;
  updatePomosNo: (id: number, no: number) => void;
  updateCurrentTask: (taskId: number) => void;
};

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  lastId: 0,
  currentTask: 0,
  addTask: () => {},
  updateTaskIsDone: () => {},
  updateTaskText: () => {},
  removeTask: () => {},
  clearTasks: () => {},
  updateCompletedPomosNo: () => {},
  updatePomosNo: () => {},
  updateCurrentTask: () => {},
});

export const TaskProvider: FC<Props> = ({ children }) => {
  // localStorage
  const todosLS = localStorage.getItem("todos");
  const todosObj = todosLS ? (JSON.parse(todosLS) as ITask[]) : [];
  const currentTaskLS = localStorage.getItem("currentTask");
  const currentTaskObj = currentTaskLS ? Number(JSON.parse(currentTaskLS)) : 0;

  // useState
  const [tasks, setTasks] = useState<ITask[]>(todosObj);
  const [lastId, setLastId] = useState<number>(
    todosObj.length > 0 ? todosObj[todosObj.length - 1].id : 0
  );
  const [currentTask, setCurrentTask] = useState(currentTaskObj);

  // functions
  const addTask = (task: string) => {
    const newTask: ITask = {
      id: lastId + 1,
      task: task,
      isDone: false,
      completedPomosNo: 0,
      pomosNo: 1,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setLastId(newTask.id);
  };

  const updateTaskIsDone = (id: number, isDone: boolean) => {
    // filter task by id
    tasks.filter((ttask: ITask) => {
      if (ttask.id === id) {
        ttask.isDone = isDone;
        setTasks([...tasks]);
      }
    });
  };

  const updateTaskText = (id: number, task: string) => {
    // filter task by id
    tasks.filter((ttask: ITask) => {
      if (ttask.id === id) {
        ttask.task = task;
        setTasks([...tasks]);
      }
    });
  };

  const removeTask = (id: number) => {
    // filter task by id
    setTasks([...tasks.filter((ttask) => ttask.id !== id)]);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const updateCompletedPomosNo = (id: number) => {
    tasks.filter((ttask: ITask) => {
      if (ttask.id === id) {
        ttask.completedPomosNo += 1;
        setTasks([...tasks]);
      }
    });
  };

  const updatePomosNo = (id: number, no: number) => {
    tasks.filter((ttask: ITask) => {
      if (ttask.id === id) {
        ttask.pomosNo = no;
        setTasks([...tasks]);
      }
    });
  };

  const updateCurrentTask = (taskId: number) => {
    setCurrentTask(taskId);
    localStorage.setItem("currentTask", String(taskId));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        lastId,
        currentTask,
        addTask,
        updateTaskIsDone,
        updateTaskText,
        removeTask,
        clearTasks,
        updateCompletedPomosNo,
        updatePomosNo,
        updateCurrentTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
