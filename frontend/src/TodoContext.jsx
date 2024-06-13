import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const TodoContext = createContext();

export const useTodos = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/todos/')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  const addTask = (task) => {
    axios.post('http://localhost:8000/todos/', task)
      .then(response => {
        setTasks([...tasks, response.data]);
      })
      .catch(error => {
        console.error("There was an error adding the task!", error);
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8000/todos/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the task!", error);
      });
  };

  const updateTask = (id, updatedTask) => {
    axios.put(`http://localhost:8000/todos/${id}`, updatedTask)
      .then(response => {
        setTasks(tasks.map(task => (task.id === id ? response.data : task)));
      })
      .catch(error => {
        console.error("There was an error updating the task!", error);
      });
  };

  return (
    <TodoContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TodoContext.Provider>
  );
};
