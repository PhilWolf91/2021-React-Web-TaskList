import React from 'react';
import Start from './Start';

class TaskList extends React.Component {
    
    constructor(props){
        super(props);

        console.log(props);
        this.state = { tasks: props.tasks }
        this.addTask = this.addTask.bind(this);
    }

    addTask(task){

        this.props.addNewTask(task);

    }

    render(){

        let taskList = this.state.tasks.map( ( task, i ) => 
            <p key={i}> {task} </p>
        )

        return (
            <div> 
                <h1> Task List Bitch. </h1>
                { taskList }
                <Start addNewTask={ this.addTask } />
            </div>
        )
    }
}

export default TaskList;