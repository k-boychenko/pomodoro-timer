import React, { useState, useContext, FC } from 'react';
import { Radio } from '@mui/material';

// import components
import { TaskContext } from '../../context/TaskContext';
import { TaskContextType, ITask } from '../../context/TaskContext';

// import img
import unchecked from '../../img/unchecked_icon.svg';
import checked from '../../img/check_icon.svg';

const Task: FC<ITask> = (task) => {
    // useContext
    const { currentTask, updateTask, removeTask, updatePomosNo, updateCurrentTask } = useContext(TaskContext) as TaskContextType;
    // useState
    const [taskText, setTaskText] = useState(task.task);
    const [isDone, setisDone] = useState(task.isDone);
    // const [completedPomosNo, setCompletedPomosNo] = useState(task.completedPomosNo);
    // const [pomosNo, setPomosNo] = useState(task.pomosNo);

    /**handlers */
    const handleTaskChanged = (event: React.FormEvent<HTMLInputElement>) => {
        setTaskText(event.currentTarget.value);
        updateTask(task.id, taskText, task.isDone);
    }

    const handleIsDoneChanged = (event: React.MouseEvent<HTMLImageElement>) => {
        if (!isDone && currentTask === task.id) {
            updateCurrentTask(0);
        }
        setisDone(!isDone);
        updateTask(task.id, taskText, task.isDone);
        
    }

    const handleTaskRemoved = (event: React.MouseEvent<HTMLDivElement>) => {
        if (window.confirm("Do you want to delete this task?")) removeTask(task.id);
    }

    const handleAddPomo = () => {
        if (isDone) return;

        // setPomosNo(pomosNo + 1);
        updatePomosNo(task.id, task.pomosNo + 1);
    };

    const handleRemovePomo = () => {
        if (isDone) return;

        if (task.pomosNo === 0) return;

        // setPomosNo(task.pomosNo - 1);
        updatePomosNo(task.id, task.pomosNo - 1);
    };

    const handleCurrentTaskOnClick = (event: React.InputHTMLAttributes<HTMLInputElement>) => {
        updateCurrentTask(task.id);
    }

    return (
        <div className='align-inline task-data'>
            <div className="crnt-task">
                {/* <input type="radio" name='current' disabled={isDone} 
                    onChange={handleCurrentTaskOnClick} 
                    checked={currentTask === task.id}
                    /> */}
                <Radio 
                    className='current-task-check'
                    name="current"
                    disabled={isDone}
                    checked={currentTask === task.id}
                    onChange={handleCurrentTaskOnClick} 
                />
            </div>
            <div className="task-check not-done">
                <img src={ isDone ? checked : unchecked } alt="" onClick={handleIsDoneChanged} />
            </div>
            <div className="">
                <input 
                    className="task-txt" 
                    type="text" 
                    name="taskText" 
                    value={taskText} 
                    disabled={isDone} 
                    style={{ textDecoration: isDone ? "line-through" : "none"}}
                    onChange={handleTaskChanged} 
                />
            </div>
            <div className="task-counter center align-inline">
                {/* n of completed pomos */}
                <span className="number">{task.completedPomosNo}</span>
            </div>
            <div className="pomodoro-counter center align-inline">
                {/* n of scheduled pomos */}
                <span className="number">{task.pomosNo}</span>
                <div className=''>
                    <div className='counter-arrow-up' onClick={handleAddPomo}></div>
                    <div className='counter-arrow-down' onClick={handleRemovePomo}></div>
                </div>
            </div>
            <div className="del-task-btn center" onClick={handleTaskRemoved}>-</div>
        </div>    
    );
};

export default Task;