import React from "react";

export default class EditTask extends React.Component{
    
    constructor(props){
        super(props);

        this.state = { task: props.task }
        this.goBack = this.goBack.bind(this);
        this.saveTask = this.saveTask.bind(this);
    }

    goBack(){
        this.props.stopEditing();
    }

    saveTask(){
        this.props.saveTask()
    }

    render(){
        return( 
            <div> 
                <button onClick={ () => this.goBack() }> Back </button>
                <button onClick={ () => this.saveTask() } style={ {float:'right'}}> Save</button>
                <p>{this.state.task.name} </p>
                <span> Notes </span> 
                <br />
                <textarea className="notesArea"></textarea>
            </div> 
        );
    }

}