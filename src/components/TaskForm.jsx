//@ts-nocheck

import React, { useState, useEffect } from 'react';

function TaskForm({ onAddTask, onUpdateTask, editingTask, onCancelEditing }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  // Populate form fields when editing
  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      const [taskDate, taskTime] = editingTask.date.split('T');
      setDate(taskDate);
      setTime(taskTime);
      setIsRecurring(editingTask.isRecurring);
    } else {
      // Reset fields when not editing
      setName('');
      setDate('');
      setTime('');
      setIsRecurring(false);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: editingTask ? editingTask.id : Date.now().toString(),
      name,
      date: `${date}T${time}`,
      isRecurring,
    };

    if (editingTask) {
      onUpdateTask(task);
    } else {
      onAddTask(task);
    }

    // Reset form
    setName('');
    setDate('');
    setTime('');
    setIsRecurring(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <label>
        Recurring:
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
        />
      </label>
      <div className="form-buttons">
        {editingTask ? (
          <>
            <button type="submit" className="update-button">Update Task</button>
            <button type="button" className="cancel-button" onClick={onCancelEditing}>
              Cancel Edit
            </button>
          </>
        ) : (
          <button type="submit" className="add-button">Add Task</button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
