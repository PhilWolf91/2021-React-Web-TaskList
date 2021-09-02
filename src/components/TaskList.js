import React from 'react';
import Start from './Start';
import EditTask from './EditTask';

class TaskList extends React.Component {
    
    constructor(props){
        super(props);

        this.state = { 
            tasks: props.tasks,
            selectedTask: null,
            isAddingTask: false
        }

        this.addTask = this.addTask.bind(this);
        this.stopEditing = this.stopEditing.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.showNewTask = this.showNewTask.bind(this);
    }

    addTask(task){
        this.props.addNewTask(task);
        this.setState( {...this.state, isAddingTask: false } )   
    }

    editTask(task){
        this.setState( { tasks: this.state.tasks, selectedTask: task} )
    }

    stopEditing(){
        this.setState({ tasks: this.state.tasks, selectedTask: null})
    }

    showNewTask(){
        this.setState( {...this.state, isAddingTask: true });
    }

    deleteTask(task){
        let tasks = this.state.tasks.slice();
        tasks = tasks.filter( t => { return t !== task})

        this.setState({ tasks: tasks, selectedTask: null})

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    render(){

        if(this.state.selectedTask === null){
            
            let taskList = this.state.tasks.map( ( task, i ) => 
                <div key={task.id} className="taskBlock" >
                    <span onClick={ () => this.editTask(task) } > 
                        {task.name}
                    </span>
                    <strong onClick={ () => this.deleteTask(task) } className="deleteButton"> X </strong>
                </div>
            )

            let isAddingTask = this.state.isAddingTask;

            return (
                <div> 
                    <button onClick={ () => { this.showNewTask() }}> Add New </button>
                    { isAddingTask && <Start addNewTask={ this.addTask } /> }
                    { taskList }
                </div>
            )
            
        }
        else{

            return(
                <EditTask task={this.state.selectedTask} stopEditing={ this.stopEditing } />
            )
            
        }
        
    }
    
}

export default TaskList;