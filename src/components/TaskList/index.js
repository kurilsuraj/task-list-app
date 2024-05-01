import Task from '../Task';
import './index.css'

function TaskList({ users, tasks, onToggleCompleted, onEditStatus,onAssignTask, onDeleteTask}) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
      <Task key={task.id} users={users} task={task} onToggleCompleted={onToggleCompleted} onEditStatus={onEditStatus} onAssignTask={onAssignTask} onDeleteTask={onDeleteTask}/>
      ))}
    </ul>
  );
}

export default TaskList;
