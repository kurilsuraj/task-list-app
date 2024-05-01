import React from 'react';
import './index.css'

function TaskSummary({ completedTasks, totalTasks }) {
  const completionPercentage = Math.floor((completedTasks / totalTasks) * 100);

  return (
    <div className="task-summary">
      <h2>Task Summary</h2>
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
      {completionPercentage > 0 && (
        <p>Completion Percentage: {completionPercentage}%</p>
      )}
    </div>
  );
}

export default TaskSummary;
