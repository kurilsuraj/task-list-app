import React, { useState } from 'react';
import './index.css'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTask(title.trim()); // Trim whitespace
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input className='input-style' placeholder='Add a Task'
        type="text"
        id="new-task"
        name="new-task"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <button className='add-button' type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
