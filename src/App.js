import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskSummary from './components/TaskSummary';
import './App.css'


function TaskListApp() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([{name: "No One", id: "No One"}]); 
  const [user, setUser] = useState("")

  const handleAddTask = (title) => {
    setTasks([...tasks, { id: Date.now(), title, completed: false, assignedTo: null, status: "Yet to Start" }]);
  };

  const handleToggleCompleted = (taskId) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  const onChnageUserInput = event => {
    setUser(event.target.value)
  }

  const handleAssignTask = (taskId, user) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, assignedTo: user } : task
      )
    );
  };

  const handleAddUser = () => {
    const id = Date.now()
    setUsers([...users, {'name': user,id}])
    setUser("")
  }

  const onEditStatus = (taskId, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: status } : task
      )
    );
  }

  const onDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const EmpltyListView = () => (
    <div className='emply-list-container'>
        <h1>Task List is Empty, Add a Task to Show here</h1>
    </div>
    
  )

  const TaskListView = () => (
    <TaskList users={users} tasks={tasks} onToggleCompleted={handleToggleCompleted} onAssignTask={handleAssignTask} onEditStatus={onEditStatus} onDeleteTask={onDeleteTask}/>
  )

  return (
    <div className="task-list-app">
      <div className='header'>
        <div className='logo-heading'>
          <img className='logo' src="https://res.cloudinary.com/dcqsyb9d7/image/upload/v1714557905/list%20app/wkziuyq8hlelrylpfqjy.png" alt="logo" />
          <h1>Task List</h1>
        </div>
      
      <TaskForm onAddTask={handleAddTask} />
      <div>
      <input className='input-style' placeholder='Enter User Name' type="text" value={user} onChange={onChnageUserInput} />
      <button className='add-button' onClick={handleAddUser}>Add User</button>
      </div>
      </div>
      {tasks.length === 0 ? <EmpltyListView /> : <TaskListView />}
      {tasks.length > 0 && <TaskSummary completedTasks={tasks.filter((task) => task.completed).length} totalTasks={tasks.length} />}
    </div>
  );
}

export default TaskListApp;
