import React, { useState, useContext } from 'react';

import { TaskContext } from '../../context/TaskContext';
import { TaskContextType } from '../../context/TaskContext';

const AddTask = () => {
    // useContext
    const { addTask } = useContext(TaskContext) as TaskContextType;
    // usestate
    const [newTask, setNewTask] = useState('');

    /**handlers */
    const handleTaskChanged = (event: React.FormEvent<HTMLInputElement>) => {
        setNewTask(event.currentTarget.value);
    }

    const handleAdd = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        addTask(newTask);
        setNewTask('');
    };

    return(
        <form action="" className='center'>
            <input type="text" name="" id="" className='task-txt' value={newTask} onChange={handleTaskChanged} />
            <div className='add-task-btn center' onClick={handleAdd}>+</div>
        </form>
    );
};


export default AddTask;