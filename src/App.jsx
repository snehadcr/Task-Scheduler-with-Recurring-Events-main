//@ts-nocheck

import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import Calendar from './components/Calendar';
import axios from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // Track the task being edited

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Failed to fetch tasks:', error));
  }, []);

  // Add a new task
  const addTask = async (newTask) => {
    try {
      const response = await axios.post('/tasks', newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  // Update an existing task
  const updateTask = async (updatedTask) => {
    try {
      await axios.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
      setEditingTask(null); // Clear edit mode
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Set task for editing
  const startEditingTask = (task) => {
    setEditingTask(task);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTask(null);
  };

  return (
    <div className="container">
      <div className="task-scheduler">
        <h1 className="task-scheduler-heading">Task Scheduler</h1>
        {/* Task Form */}
        <TaskForm 
          onAddTask={addTask} 
          onUpdateTask={updateTask}
          editingTask={editingTask}
          onCancelEditing={cancelEditing}
        />

        {/* Task List */}
        <div className="task-list-container">
          <Calendar 
            tasks={tasks}
            onEditTask={startEditingTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
