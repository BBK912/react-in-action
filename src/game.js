import React from "react";
import { calculateWinner } from "./utils";
function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  export class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null),
            position: [],
          },
        ],
        xIsNext: true,
        stepNumber: 0,
      };
    }
    handleCLick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares,
            position: [
               Math.floor(i / 3) + 1 ,
               i % 3 + 1
            ]
          },
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
    jummTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0,
      });
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const result = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ? "Go to move #" + move + ' (' + step.position.join() + ')' : "Go to game start";
        return (
          <li key={move} className={this.state.stepNumber === move ? 'active': ''}>
            <button onClick={() => this.jummTo(move)}>{desc}</button>
          </li>
        );
      });
      let status;
      let line;
      if (result) {
        status = "Winner: " + result.winner;
        line = result.line;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        line =  null;
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board
              line={line}
              squares={current.squares}
              onClick={(i) => this.handleCLick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }