import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      break: 5,
      session: 25,
      minutes: 25,
      seconds: 0,
      countdown: '',
      timerDisplay: '25:00',
      timerState: '',
      currentState: 'Session'
    }
    
    this.increment=this.increment.bind(this);
    this.decrement=this.decrement.bind(this);
    this.play=this.play.bind(this)
    this.display=this.display.bind(this)
    this.reset=this.reset.bind(this)
    this.beep=this.beep.bind(this)
  }
  
  increment(event) {
    let element = event.target
    switch(element.previousSibling.id) {
      case 'break-length': 
        if (this.state.break<60) {
        this.setState({break: this.state.break + 1});
        element.previousSibling.innerHTML = this.state.break; 
        break;
        } else {return}
      default: 
        if (this.state.session<60) {
          this.setState({
            session: this.state.session + 1,
            minutes: this.state.minutes + 1
          }, () => {this.display()});
          element.previousSibling.innerHTML = this.state.session;
        } else {return}
    }
    console.log(this.state.minutes)

  }
  
  decrement(event) {
    let element = event.target
    console.log(element.nextSibling.id)
    
    switch(element.nextSibling.id) {
      case 'break-length': 
        if (this.state.break>1) {
        this.setState({break: this.state.break - 1});
        element.nextSibling.innerHTML = this.state.break;
        break;
        } else {return}
      default: 
        if (this.state.session>1) {
        this.setState({
          session: this.state.session - 1,
          minutes: this.state.minutes - 1
        }, () => {this.display()});
        element.nextSibling.innerHTML = this.state.session;
        } else {return}
    }
  }
  
  display() {
    let seconds = this.state.seconds.toString()
    if (this.state.seconds<10) {
      seconds = '0'+seconds
    }
    let minutes = this.state.minutes.toString()
    if (this.state.minutes<10) {
      minutes = '0'+minutes
    }
    
    
    const disp = `${minutes}:${seconds}`   
    this.setState({timerDisplay: disp})
  }
  
  beep() {
    document.getElementById('beep').play()
  }

  
  reset() {
    this.setState(
      {
        minutes: 25, 
        session: 25,
        break: 5,
        seconds: 0, 
        countdown: clearInterval(this.state.countdown), 
        timerState: 'reset',
        currentState: 'Session'
      }, ()=>{this.display()})
    document.getElementById('start_stop').className="fas fa-play"
    document.getElementById('beep').pause()
    document.getElementById('beep').currentTime=0
  }
        
   play() {   
    if (this.state.timerState !== 'play') {
      document.getElementById('start_stop').className="fas fa-pause"
      this.setState({countdown: setInterval(count.bind(this),1000), timerState: 'play' })

      function count() {
        this.setState({seconds: this.state.seconds-1});
        if (this.state.seconds<0) {
          if (this.state.minutes ===0 ){
            this.beep()
            if (this.state.currentState === 'Session') {
              this.setState({currentState: 'Break', minutes: this.state.break, seconds: 0},()=>{this.display()})
            } else {
              this.setState({currentState: 'Session', minutes: this.state.session,seconds: 0},()=>{this.display()})
            }
            return 
          }
          this.setState({seconds: 59});
          this.setState({minutes: this.state.minutes-1});
        } 
        this.display()
      }
    } else {
      this.setState({countdown: clearInterval(this.state.countdown), timerState: 'pause'})
      document.getElementById('start_stop').className="fas fa-play"
    }
    
    
    
  }
  
  render() {
    return(
      <div className='container'>
        <h1>Pomodoro Clock</h1>
        <div className='break'>
          <h2 id='break-label'>Break Length</h2>
          <i class="fas fa-arrow-circle-down" id='break-decrement' onClick={this.decrement}></i>
          <h3 id='break-length'>{this.state.break}</h3>
          <i class="fas fa-arrow-circle-up" id='break-increment' onClick={this.increment}></i>
        </div>
        <div className='session'>
          <h2 id='session-label'>Session Length</h2>
          <i class="fas fa-arrow-circle-down" id='session-decrement' onClick={this.decrement}> </i>
           <h3 id='session-length'>{this.state.session}</h3>
          <i class="fas fa-arrow-circle-up" id='session-increment'  onClick={this.increment}> </i>     
        </div>
        <div className='timer'>
          <h2 id='timer-label'>{this.state.currentState}</h2>
          <h2 id='time-left'>{this.state.timerDisplay}</h2>
          <div className='buttons'>
            <i class="fas fa-play" id='start_stop' onClick={this.play}></i>
            {/*<i class="fas fa-pause" id='pause' onClick={this.pause}></i>*/}
            <i class="fas fa-redo" id='reset' onClick={this.reset}></i>
          </div>  
        </div>
        <audio id="beep"  preload="auto" src="http://freewavesamples.com/files/Korg-Triton-Slow-Choir-ST-C4.wav" type="audio/wav"></audio>
      </div>
      
    )
  }
}

export default App;
