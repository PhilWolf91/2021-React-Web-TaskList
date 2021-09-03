import React from "react";

export default class EditTask extends React.Component{

    stopWatch;

    constructor(props){
        super(props);

        this.state = { 
            task: props.task,
            totalTime: 0 
        }
        this.goBack = this.goBack.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    goBack(){
        this.props.stopEditing();
    }

    saveTask(){
        this.props.saveTask(this.state)
    }

    startTimer(){
        
        this.stopWatch = setInterval( () => {
            this.setState( {...this.state, totalTime: this.state.totalTime += 1 });
        }, 1000)
        
    }

    stopTimer(){
        clearInterval(this.stopWatch);
    }

    render(){
        return( 
            <div> 
                <button onClick={ () => this.goBack() }> Back </button>
                <button onClick={ () => this.saveTask() } style={ {float:'right'}}> Save</button>
                <p>{this.state.task.name} </p>
                <div id="timer">
                    <p>
                        Total time: {this.state.totalTime}
                    </p>
                    
                    <button className="timerButton" onClick={ () => this.startTimer() }> start </button> 
                    <button className="timerButton" onClick={ () => this.stopTimer() }> stop </button>
                </div>
                <span> Notes </span> 
                <br />
                <textarea className="notesArea"></textarea>
            </div> 
        );
    }

}