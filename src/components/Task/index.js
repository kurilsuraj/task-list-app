import React, { useState } from 'react';
import './index.css'

function Task({ users, task, onToggleCompleted, onEditStatus, onAssignTask, onDeleteTask}) {
  const [activeStatus, setStatus] = useState('Yet to Start');
  const [selectedUser, setSelectedUser] = useState("No One");
  const [showEdit , setShowEdit] =useState(true)
 
  const onChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const onEditStatus1 = () => {
    onEditStatus(task.id, activeStatus, task.completed);
  };

  const onChangeUser = (event) => {
    setSelectedUser(event.target.value);
  };

  const onUpdateUser1 = () => {
    onAssignTask(task.id, selectedUser);
  };

  const onClickEdit = () => {
    setShowEdit(!showEdit)
    console.log(showEdit)
  }

  const onDelete = () => {
    onDeleteTask(task.id)
  }

  const UpdateButtonContainer = () => (
    <div>
    <select className='select-option' onChange={onChangeStatus} value={activeStatus}>
      <option value="Yet to Start">Yet to Start</option>
      <option value="Started">Started</option>
      <option value="Completed">Completed</option>
    </select>
    <button className='update-button' onClick={onEditStatus1}>Update Status</button>
    <select className='select-option' onChange={onChangeUser} value={selectedUser}>
      {users.map((each) => (
        <option key={each.id} value={each.name}>
          {each.name}
        </option>
      ))}
    </select>
    <button className='update-button' onClick={onUpdateUser1} type="button">
      Update User
    </button>
    </div>
  )

  return (<div className='list-cheackbox-container'><input className='cheack-input'
    type="checkbox"
    checked={task.completed}
    onChange={() => onToggleCompleted(task.id, task.completed)}
  />
  <li key={task.id} className={`${task.completed ? 'task-completed' : 'task'}`}>
    <div className='list-space-between-container'>
    <div>
      <p><span className='span-elment'>Task Title:-</span>{task.title}</p>
      <p><span className='span-elment'>status: </span>{task.status}</p>
      <p><span className='span-elment'>Assigned to: </span>{task.assignedTo}</p>
    </div>

      {showEdit === true ? <img onClick={onClickEdit} className='edit-icon' src="https://res.cloudinary.com/dcqsyb9d7/image/upload/v1710199763/tastyKitchensApp/dqrqbuqcnbqdpgfcip6t.svg" alt="edit button" /> : <UpdateButtonContainer />}
    </div>
    </li>
    
    <img onClick={onDelete} className='delete-icon' src="https://res.cloudinary.com/dcqsyb9d7/image/upload/v1714571818/list%20app/av1wxnuhqpjtsqbhxlf2.png" alt='delete-icon' />
  </div>
    
  );
}

export default Task;

