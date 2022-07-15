import React from 'react'
import axios from 'axios'

const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 

export default class AppClass extends React.Component {
  
  state = {
    message: initialMessage,
    email: initialEmail,
    steps: initialSteps,
    index: initialIndex,
    board: [0,1,2,3,4,5,6,7,8],
    xCoord: 2,
    yCoord: 2
  };

  getIndex = (id) => {
    const newBoard = [...this.state.board];
    newBoard[id] = this.state.index;
    
    if (id === "up") {
      if(this.state.index > 2) {
        this.setState({
          ...this.state,
          index: this.state.index - 3,
          steps: this.state.steps + 1,
          yCoord: this.state.yCoord - 1,
          board: newBoard,
          message: ''
        })
      } else {
        this.setState({
          ...this.state,
          message: "You can't go up",
          board: newBoard
        })
      }
    } else if (id === "right") {
      if((this.state.index + 1) % 3) {
        this.setState({
          ...this.state,
          index: this.state.index + 1,
          steps: this.state.steps + 1,
          xCoord: this.state.xCoord + 1,
          board: newBoard,
          message: ''
        })
      } else {
        this.setState({
          ...this.state,
          message: "You can't go right",
          board: newBoard
        })
      }
    } else if (id === "down") {
      if(this.state.index < 6) {
        this.setState({
          ...this.state,
          index: this.state.index + 3,
          steps: this.state.steps + 1,
          yCoord: this.state.yCoord + 1,
          board: newBoard,
          message: ''
        })
      } else {
        this.setState({
          ...this.state,
          message: "You can't go down",
          board: newBoard
        })
      }
    } else if (id === "left") {
      if(this.state.index % 3){
        this.setState({
          ...this.state,
          xCoord: this.state.xCoord - 1,
          index: this.state.index - 1,
          steps: this.state.steps + 1,
          board: newBoard,
          message: ''
        })
      } else {
        this.setState({
          ...this.state,
          message: "You can't go left",
          board: newBoard
        })
      }
    } else if (id === "reset") {
      this.setState({
        ...this.state,
        message: '',
        email: '',
        steps: 0,
        index: 4,
        board: [0,1,2,3,4,5,6,7,8],
        xCoord: 2,
        yCoord: 2,
        board: newBoard
      })
    }
  }

  moves = (evt) => {
    this.getIndex(evt.target.id)
  }

  onChange = (evt) => {
    this.setState({...this.state, email: evt.target.value})
  }

  validateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
    {
      return (true)
    }
      return (false)
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    if(this.state.email === ''){
      this.setState({...this.state, message: 'Ouch: email is required' })
    } else if(this.state.email === 'foo@bar.baz'){
      this.setState({...this.state, message: 'foo@bar.baz failure #71'})
    } else if(this.validateEmail() === false){
      this.setState({...this.state, message: 'Ouch: email must be a valid email'})
    } else {
    axios.post(`http://localhost:9000/api/result`, { "x": this.state.xCoord, "y": this.state.yCoord, "steps": this.state.steps, "email": this.state.email.trim() })
    .then(res => this.setState({...this.state, message: res.data.message, email: initialEmail}))
    .catch(err => console.error(err))
    }
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.xCoord},{this.state.yCoord})</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            this.state.board.map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.moves} id="left">LEFT</button>
          <button onClick={this.moves} id="up">UP</button>
          <button onClick={this.moves} id="right">RIGHT</button>
          <button onClick={this.moves} id="down">DOWN</button>
          <button onClick={this.moves} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.state.email} id="email" placeholder="type email" type="email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
