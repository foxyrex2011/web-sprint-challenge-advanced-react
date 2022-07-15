import React from 'react'

export default class AppClass extends React.Component {
  
  state = {
    message: '',
    email: '',
    steps: 0,
    index: 4,
    board: [0,1,2,3,4,5,6,7,8],
    xAxis: 2,
    yAxis: 2
  }

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
  
  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.xAxis},{this.state.yAxis})</h3>
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
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
