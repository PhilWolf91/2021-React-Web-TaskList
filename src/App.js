import logo from './logo.svg';
import './App.css';
import React from 'react';
import TaskList from './TaskList';
import Start from './Start';
import { Task } from './Models';

class App extends React.Component {

  constructor(){
    super()
    console.log('App: constructor');
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : []

    this.state = { tasks: tasks }
    this.addTask = this.addTask.bind(this);
  }

  clearTasks(){
    localStorage.setItem('tasks', []);
    this.setState( { tasks: [] })
  }

  addTask(taskName){

    if(taskName){

      let tasks = this.state.tasks;

      let task = new Task(taskName);
      task.id = tasks.length + 1;
    
      tasks.push(task);
  
      this.setState({ tasks: tasks });
  
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

  }

  renderClearButton(){
    return(
      <button onClick={() => {this.clearTasks()}}> Clear Tasks</button>
    )
  }

  renderNoTasks(){
    return(
      <Start addNewTask={ this.addTask } />
    )
  }

  renderFoundTasks(){
    return (
      <TaskList addNewTask={ this.addTask } tasks={ this.state.tasks } />
    )
  }

  render() {

    if(this.state.tasks.length === 0){
      return (
        <div>
          {this.renderClearButton()}
          {this.renderNoTasks()}
        </div>
      ) 
    }
    else{
      return (
        <div>
          {this.renderClearButton()}
          {this.renderFoundTasks()}
        </div>
      )
    }
  }
}

export default App;
