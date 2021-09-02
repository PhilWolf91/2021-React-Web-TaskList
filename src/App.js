import './App.css';
import React from 'react';
import TaskList from './components/TaskList';
import Start from './components/Start';
import { Task } from './Models';

class App extends React.Component {

  constructor(){
    super()
    
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
      
      task.id = new Date();
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
