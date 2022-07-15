import React, {useState} from 'react'
import axios from 'axios'

const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 

export default function AppFunctional(props) {

  const [ state, setState ] = useState({
    message: initialMessage,
    email: initialEmail,
    steps: initialSteps,
    index: initialIndex,
    board: [0,1,2,3,4,5,6,7,8],
    xCoord: 2,
    yCoord: 2
  });
  
  const getIndex = (id) => {
    const newBoard = [...state.board];
    newBoard[id] = state.index;
    
    if (id === "up") {
      if(state.index > 2) {
        setState({
          ...state,
          index: state.index - 3,
          steps: state.steps + 1,
          yCoord: state.yCoord - 1,
          board: newBoard,
          message: ''
        })
      } else {
        setState({
          ...state,
          message: "You can't go up",
          board: newBoard
        })
      }
    } else if (id === "right") {
      if((state.index + 1) % 3) {
        setState({
          ...state,
          index: state.index + 1,
          steps: state.steps + 1,
          xCoord: state.xCoord + 1,
          board: newBoard,
          message: ''
        })
      } else {
        setState({
          ...state,
          message: "You can't go right",
          board: newBoard
        })
      }
    } else if (id === "down") {
      if(state.index < 6) {
        setState({
          ...state,
          index: state.index + 3,
          steps: state.steps + 1,
          yCoord: state.yCoord + 1,
          board: newBoard,
          message: ''
        })
      } else {
        setState({
          ...state,
          message: "You can't go down",
          board: newBoard
        })
      }
    } else if (id === "left") {
      if(state.index % 3){
        setState({
          ...state,
          xCoord: state.xCoord - 1,
          index: state.index - 1,
          steps: state.steps + 1,
          board: newBoard,
          message: ''
        })
      } else {
        setState({
          ...state,
          message: "You can't go left",
          board: newBoard
        })
      }
    } else if (id === "reset") {
      setState({
        ...state,
        message: '',
        email: '',
        steps: 0,
        index: 4,
        board: [0,1,2,3,4,5,6,7,8],
        xCoord: 2,
        yCoord: 2,
        board: newBoard,
        message: ''
      })
    }
  }

  const moves = (evt) => {
    getIndex(evt.target.id)
  }

  const onChange = (evt) => {
    setState({...state, email: evt.target.value})
  }

  const validateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email))
    {
      return (true)
    }
      return (false)
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    if(state.email === ''){
      setState({...state, message: 'Ouch: email is required' })
    } else if(state.email === 'foo@bar.baz'){
      setState({...state, message: 'foo@bar.baz failure #71'})
    } else if(validateEmail() === false){
      setState({...state, message: 'Ouch: email must be a valid email'})
    } else {
    axios.post(`http://localhost:9000/api/result`, { "x": state.xCoord, "y": state.yCoord, "steps": state.steps, "email": state.email.trim() })
    .then(res => setState({...state, message: res.data.message, email: ''}))
    .catch(err => console.error(err))
    }
  }

  return (
    <div id="wrapper" className={props.className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({state.xCoord},{state.yCoord})</h3>
          <h3 id="steps">You moved {state.steps} {state.steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            state.board.map(idx => (
              <div key={idx} className={`square${idx === state.index ? ' active' : ''}`}>
                {idx === state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={moves} id="left">LEFT</button>
          <button onClick={moves} id="up">UP</button>
          <button onClick={moves} id="right">RIGHT</button>
          <button onClick={moves} id="down">DOWN</button>
          <button onClick={moves} id="reset">reset</button>
        </div>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} value={state.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
    </div>
  )
}
