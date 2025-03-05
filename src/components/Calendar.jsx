//@ts-nocheck

import React from 'react';

function Calendar({ tasks, onEditTask, onDeleteTask }) {
  // Function to format the date in a more readable way
  const formatDate = (dateString) => {
    const taskDate = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(taskDate);
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <span>
            {task.name} - {formatDate(task.date)} {task.isRecurring ? '(Recurring)' : ''}
          </span>
          <div>
            <button 
              onClick={() => onEditTask(task)} 
              className="edit"
            >
              Edit
            </button>
            <button 
              onClick={() => onDeleteTask(task.id)} 
              className="delete"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Calendar;
