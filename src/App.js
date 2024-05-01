import React, { useState } from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts"
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

  const handleToggleCompleted = (taskId, status) => {
    const newStatus = status ? "Yet to Start" : "Completed"

    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed , status: newStatus} : task))
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

  const onEditStatus = (taskId, status, completedStatus) => {
    const newCompletedValue = status === "Completed" ? true : false
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: newCompletedValue, status: status } : task
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

  const yetToStartCount = tasks.reduce((accumulator, current) => current.status === "Yet to Start" ? accumulator + 1 : accumulator, 0);
  const startedCount = tasks.reduce((accumulator, current) => current.status === "Started" ? accumulator + 1 : accumulator, 0);
  const completedCount = tasks.reduce((accumulator, current) => current.status === "Completed" ? accumulator + 1 : accumulator, 0);

  const data = [
    {
      count: completedCount,
      status: "Completed",
    },
    {
      count: startedCount,
      status: "Started",
    },
    {
      count: yetToStartCount,
      status: "Yet To Start",
    },
  ]

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
      {tasks.length > 0 && <div className='summary-container'>
      <TaskSummary completedTasks={tasks.filter((task) => task.completed).length} totalTasks={tasks.length} />
        <div className="reachart"><ResponsiveContainer  width="100%" height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Completed" fill="green" />
          <Cell name="Started" fill="yellow" />
          <Cell name="Yet to Start" fill="orange" />
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="center"
        />
      </PieChart>
    </ResponsiveContainer></div>
      
      </div>}
      
    </div>
  );
}

export default TaskListApp;
