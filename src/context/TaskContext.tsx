import React, { useState, createContext, FC } from 'react';

export interface ITask {
    id: number;
    task: string;
    isDone: boolean;
    completedPomosNo: number;
    pomosNo: number;
};

interface Props {
    children? : React.ReactNode;
}

export type TaskContextType = {
    tasks: ITask[];
    lastId: number;
    currentTask: number,
    addTask: (newTask: string) => void;
    updateTask: (id: number, task: string, isDone: boolean) => void;
    removeTask: (taskId: number) => void;
    clearTasks: () => void;
    updateCompletedPomosNo: (id: number) => void;
    updatePomosNo: (id: number, no: number) => void;
    updateCurrentTask: (taskId: number) => void,
};


export const TaskContext = createContext<TaskContextType>({
    tasks: [],
    lastId: 0,
    currentTask: 0,
    addTask: () => {},
    updateTask: () => {},
    removeTask: () => {},
    clearTasks: () => {},
    updateCompletedPomosNo: () => {},
    updatePomosNo: () => {},
    updateCurrentTask: () => {},
});

export const TaskProvider: FC<Props> = ({ children }) => {
    // useState stuff
    const [tasks, setTasks] = useState<ITask[]>([{id: 1,
                                                  task: "aaaaaa",
                                                  isDone: false,
                                                  completedPomosNo: 0,
                                                  pomosNo: 1
                                                },
                                                {id: 2,
                                                    task: "bbbbb",
                                                    isDone: true,
                                                    completedPomosNo: 2,
                                                    pomosNo: 2
                                                  }]);
    const [lastId, setLastId] = useState<number>(2);
    const [currentTask, setCurrentTask] = useState(0);

    // functions
    const addTask = (task: string) => {
        const newTask: ITask = {
            id: lastId + 1,
            task: task,
            isDone: false,
            completedPomosNo: 0,
            pomosNo: 1
        }
        setTasks(prevTasks => [...prevTasks, newTask]);
        setLastId(newTask.id);
    };

    const updateTask = (id: number, task: string, isDone: boolean) => {
        // filter task by id
        tasks.filter((ttask: ITask) => {
            if (ttask.id === id) {
                ttask.task = task;
                ttask.isDone = isDone;
                setTasks([...tasks]);
            }
        });
        // let updTask: ITask = tasks.find(ttask => ttask.id = task.id);
        // updTask.task = task.task;
        // updTask.isDone = task.isDone;
    };

    const removeTask = (id: number) => {
        // filter task by id
        setTasks([...tasks.filter(ttask => ttask.id !== id)]);
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
    }

    const updatePomosNo = (id: number, no: number) => {
        tasks.filter((ttask: ITask) => {
            if (ttask.id === id) {
                // let curPomosNo = ;
                if ((ttask.pomosNo + no) >= 0) {
                    ttask.pomosNo += no;
                }
                setTasks([...tasks]);
            }
        });
    }

    const updateCurrentTask = (taskId: number) => {
        setCurrentTask(taskId);
    }

    return (
        <TaskContext.Provider value={{tasks,
                                        lastId,
                                        currentTask,
                                        addTask,
                                        updateTask,
                                        removeTask,
                                        clearTasks,
                                        updateCompletedPomosNo,
                                        updatePomosNo,
                                        updateCurrentTask,
                                    }}>
            {children}
        </TaskContext.Provider>
    );
};