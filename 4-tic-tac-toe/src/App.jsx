import { useState } from 'react'

function Board({xIsNext, squares, onPlay}) {
  function handleClick(r) {
    if (squares[r] || calculateWinner(squares)) return;
    
    const nextSquares = squares.slice();
    nextSquares[r] =xIsNext ? 'X' :'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = "";

  if(winner){
    status = "Winner: " + winner;
  }else{
    status = "Next Player: " + (xIsNext ? "X" : "o");
  }
  
  return  (
    <>
     <div className="status">{status}</div>
      <div className="board">
      <Square value={squares[0]} onSquareClick={()=> handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={()=> handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={()=> handleClick(2)}/>
      <Square value={squares[3]} onSquareClick={()=> handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={()=> handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={()=> handleClick(5)}/>
      <Square value={squares[6]} onSquareClick={()=> handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={()=> handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={()=> handleClick(8)}/>
      </div>  
    </>
    
  );
}
function Square({value, onSquareClick}) {
  return (
  <button className="square" onClick={onSquareClick}>
    {value}
  </button>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove %2 === 0;
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);  }

  function handelPlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }


  const moves = history.map ((squares, move) => {
    let description = '';
    if(move > 0) {
      description ='Go to move #' + move;
    }else {
      description = 'GO to game start';
    }

    return(
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handelPlay} />
      </div>
      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    //horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],

    //vertikal
    [0,3,6],
    [1,4,7],
    [2,5,8],

    //diagonal
    [0,4,8],
    [2,4,6]
  ];

  for(let s=0; s < lines.length;s++){
    const a = lines[s][0];//0
    const b = lines[s][1];//1
    const c = lines[s][2];//2


    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
      // console.log("sudah ada yang menang");
    }
  }
  return false
}

