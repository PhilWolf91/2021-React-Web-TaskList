import React from'react';

export default class AddTask extends React.Component {
    constructor(props){
        super(props);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e){
 
        e.preventDefault();
        
        console.log('Start: ' + e.target.task.value);
        
        this.props.addNewTask(e.target.task.value);

        e.target.task.value = ""
    }

    render(){
        return(
            <div>
                <form onSubmit={ this.addTask }>
                    <h1> Enter a task below: </h1>
                    <input name="task" />
                    <button type='submit' style={{float:'right'}} > Submit </button>
                </form>
            </div>
        )
    }
}