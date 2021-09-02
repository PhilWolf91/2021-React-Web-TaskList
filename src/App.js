import './App.css';
import React from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import { Task } from './Models';

class App extends React.Component {

  constructor(){
    super()
    
    let storedTasks = localStorage.getItem('tasks');
    let tasks = storedTasks ? JSON.parse(storedTasks) : []; 
    let hasTasks = tasks.length > 0;

    this.state = { tasks: tasks, hasTasks: hasTasks };
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  clearTasks(){
    localStorage.setItem('tasks', []);
    this.setState( { tasks: [] })
  }

  addTask(taskName){

    if(taskName){

      let tasks = this.state.tasks;
      let task = new Task(taskName);
      
      task.id = new Date();
      tasks.push(task);
  
      this.setState({ tasks: tasks });
  
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

  }

  deleteTask(task){
    let tasks = this.state.tasks.slice();
    tasks = tasks.filter( t => { return t !== task})

    this.setState( { ...this.state, tasks: tasks } );

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


  renderClearButton(){
    return(
      <button onClick={() => {this.clearTasks()}}> Clear Tasks</button>
    )
  }

  renderNoTasks(){
    return(
      <AddTask addNewTask={ this.addTask } />
    )
  }

  renderFoundTasks(){
    return (
      <TaskList addNewTask={ this.addTask } tasks={ this.state.tasks } deleteTask={ this.deleteTask } />
    )
  }

  render() {

    if(this.state.tasks.length === 0){
      return (
        <div className="App">
          {this.renderNoTasks()}
        </div>
      ) 
    }
    else{
      return (
        <div className="App">
          {this.renderFoundTasks()}
        </div>
      )
    }
  }
  
}

export default App;
