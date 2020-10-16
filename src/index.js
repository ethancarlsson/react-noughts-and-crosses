import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], lines[i]];
      } 
      else if (squares.indexOf(null) === -1){
        return ['No one. But also no losers... so you know... thats nice.', '']
      }
      }
    }
    
function Square(props) {
    return (
    <button className="square" onClick=
        {props.onClick}>
        {props.value}
    </button>
    );
}
  
  
  class Board extends React.Component {

    renderSquare(i) {
      return (<mark><Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
      /></mark>
      );
    }
  
    render() {
        var board_render = []
        
        for (var row = 1; row < 4 ;row++) {
            var square_row = []
            for (var squ = row*3-3; squ < row*3 ; squ++)
                square_row.push(this.renderSquare(squ))
            board_render.push(<div className="board-row">{square_row}</div>)
        }
      return (
        <div>
            {board_render}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    rowAndColumn = []
      constructor(props) {
          
          super(props);
          this.state = {
              history: [{
                  squares: Array(9).fill(null),
              }],
              stepNumber: 0,
              xIsNext: true,
          };
      }
      

      handleClick(i) {
        var row =  'Row'
        var column = 'Column'
        if (i > 5) {
            row = 'Row 3 '
        } else if (i > 2) {
            row = 'Row 2 '
        } else {
            row = 'Row 1 '
        }
        if (i === 2 || i === 5 || i === 8) {
            column = 'Column 3'
        } else if (i === 1 || i === 4 || i === 7) {
            column = 'Column 2'
        } else {
            column = 'Column 1'
        }
        var xorO
        if (this.state.xIsNext === true) {
            xorO = 'X'
        } else {
            xorO = 'O'
        }
        this.rowAndColumn.push(xorO + ' placed in '+ row + column)

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[i]) {
                
                return

            }
            squares[i] = this.state.xIsNext ? 'X':'O';
            this.setState({
                history: history.concat([{
                    squares: squares,
                }]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext
            })
        }
    
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
        this.rowAndColumn.length = step
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        const winner = calculateWinner(current.squares);
            const moves = history.map((step, move) => {
                const desc = move ? 
                    'Go to move #' + move : 
                    'Go to game start';
                if (move===this.rowAndColumn.length) {
                    return (
                        <li key={move}>
                            <button onClick={() => this.jumpTo(move)}>{desc}</button>
                            <b>{this.rowAndColumn[move-1]}</b>
                        </li>
                    );

                } else {
                    return (
                        <li key={move}>
                            <button onClick={() => this.jumpTo(move)}>{desc}</button>
                            {this.rowAndColumn[move-1]}
                        
                        </li>
                    );
                }
             });
            let status;
            if (winner) {
                status = 'Winner: ' + winner[0]
                var winning_spots = winner[1]
                var one = winning_spots[0]
                var two = winning_spots[1]
                var three = winning_spots[2]
                current.squares[one] = <mark>{current.squares[one]}</mark>
                current.squares[two] = <mark>{current.squares[two]}</mark>
                current.squares[three] = <mark>{current.squares[three]}</mark>
                
            } 
            else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }
      return (
        <div className="game">
          <div className="game-board">
            <Board
                squares = {current.squares}
                onClick = {(i) => this.handleClick(i)} 
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
  
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  