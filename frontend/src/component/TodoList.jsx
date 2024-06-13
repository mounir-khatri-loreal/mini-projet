import React, { useState } from 'react';
import { useTodos } from '../TodoContext';

const TodoList = () => {
  const { tasks, addTask, deleteTask, updateTask } = useTodos();
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false, date: new Date().toISOString() });

  const handleAddTask = () => {
    addTask(newTask);
    setNewTask({ title: '', description: '', completed: false, date: new Date().toISOString() });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input type="text" value={task.title} onChange={(e) => updateTask(task.id, { ...task, title: e.target.value })} />
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="New task title"
        />
        <textarea
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="New task description"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TodoList;



