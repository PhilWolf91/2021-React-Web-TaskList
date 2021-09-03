import React from 'react';
import AddTask from './AddTask';
import EditTask from './EditTask';

class TaskList extends React.Component {
    
    constructor(props){
        super(props);

        this.state = { 
            selectedTask: null,
            isAddingTask: false
        }

        this.addTask = this.addTask.bind(this);
        this.stopEditing = this.stopEditing.bind(this);
        this.showNewTask = this.showNewTask.bind(this);
    }

    addTask(task){
        this.props.addNewTask(task);
        this.setState( {...this.state, isAddingTask: false } )   
    }

    editTask(task){
        this.setState( { ...this.state, selectedTask: task} )
    }

    stopEditing(){
        this.setState({ ...this.state, selectedTask: null})
    }

    showNewTask(){
        this.setState( {...this.state, isAddingTask: true });
    }

    saveTaskEdit(){

    }

    render(){

        if(this.state.selectedTask === null){
            
            let isAddingTask = this.state.isAddingTask;

            return (
                <div> 
                    <button onClick={ () => { this.showNewTask() }}> Add New </button>
                    { isAddingTask && <AddTask addNewTask={ this.addTask } /> }
                    { 
                        this.props.tasks.map( ( task, i ) => 
                            <div key={task.id} className="taskBlock" >
                                <span onClick={ () => this.editTask(task) } > 
                                    {task.name}
                                </span>
                                <strong onClick={ () => this.props.deleteTask(task) } className="deleteButton"> X </strong>
                            </div>
                        )
                    }
                </div>
            )
            
        }
        else{

            return(
                <EditTask 
                    task={this.state.selectedTask} 
                    stopEditing={ this.stopEditing } 
                    saveTask={ this.saveTaskEdit } 
                />
            )
            
        }
        
    }
    
}

export default TaskList;