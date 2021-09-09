import React from "react";

export default class EditTask extends React.Component{

    stopWatch;

    constructor(props){
        super(props);

        let formattedTime = '00:00:00'
        if(props.task.time){
            formattedTime = this.formatTime(props.task.time);
        }

        this.state = { 
            totalTime: props.task.time || 0 ,
            formattedTime: formattedTime
        }
        this.goBack = this.goBack.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    goBack(){
        this.props.stopEditing();
    }

    saveTask(e){
        e.preventDefault();

        if(this.stopWatch){
            this.stopTimer();
        }

        let notes = e.target.notes.value;
        let task = { ...this.props.task, notes: notes, time: this.state.totalTime }

        console.log(task);
        this.props.saveTask(task);
    }

    formatTime(seconds){
        return new Date(seconds * 1000).toISOString().substr(11, 8);
    }

    startTimer(){
        
        this.stopWatch = setInterval( () => {
            let currentTotal = this.state.totalTime
            currentTotal += 1;
            //this will fail if hours > 24 since its using Date
            let formatted = this.formatTime(currentTotal);
            this.setState( {...this.state, totalTime: currentTotal, formattedTime: formatted });
        }, 1000)
        
    }

    stopTimer(){
        clearInterval(this.stopWatch);
    }

    render(){
        return( 
            <div> 
                <form onSubmit={ this.saveTask }>
                    <button onClick={ () => this.goBack()} type="button"> Back </button>
                    <button style={ {float:'right'}} type="submit"> Save</button>
                    <h2> Task </h2>
                    <p>{this.props.task.name} </p>
                    <div id="timer">
                        <h2>Timer</h2>
                        <p>
                            Total time: {this.state.formattedTime}
                        </p>
                        
                        <button className="timerButton" onClick={ () => this.startTimer() } type="button"> start </button> 
                        <button className="timerButton right" onClick={ () => this.stopTimer() } type="button"> stop </button>
                    </div>
                    <h2> Notes </h2> 
                    <br />
                    <textarea name="notes" className="notesArea" defaultValue={this.props.task.notes}  ></textarea>
                </form>
            </div> 
        );
    }

}