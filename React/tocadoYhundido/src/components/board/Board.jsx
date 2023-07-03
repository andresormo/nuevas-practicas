import React, { useEffect, useState } from 'react'
import './Board.css'
import { juego } from './level';
import Score from '../Score/Score';

const Board = ({ nivel }) => {
  const nivelSeleccionado = juego.find((x) => x.nivel === nivel);
  const [casillas, setCasillas] = useState(nivelSeleccionado.casillas);
  const [board, setBoard] = useState([]);
  const [shot, setShot] = useState(0);
  const [classShot, setClassShot] = useState('');


  const updateBoard = [...board];
  const barcos = nivelSeleccionado.barcos;

  useEffect(() => {
    setCasillas(nivelSeleccionado.casillas);
  }, [nivelSeleccionado]);



  useEffect(() => {
   
    const initialBoard = Array(casillas).fill({ initValue: false, beforeShot: null });

    const buildBoat = (boat, initBoard) => {
      let indices = Array.from({ length: casillas }, (_, index) => index);

      for (let i = 0; i < boat; i++) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        const selectedIndex = indices[randomIndex];

        initBoard[selectedIndex] = { ...initBoard[selectedIndex], initValue: true};
        indices.splice(randomIndex, 1);
    }
  }
    buildBoat(barcos, initialBoard);
    setBoard(initialBoard);
  }, [casillas]);

  
  const countShot = (index) => {
    
    if (updateBoard[index].initValue === false && updateBoard[index].beforeShot === null) {
      updateBoard[index] = {...board[index], beforeShot: false}
      setShot(shot + 1)

    } else if(updateBoard[index].initValue === true) {
      updateBoard[index] = {...board[index], beforeShot: true}
      setShot(shot + 1)
    }
    setBoard(updateBoard)
  }
console.log(board);
console.log(shot);
 

  return (

    <>
      <Score board={updateBoard} />
      <div className='tablero'>

        {board.map((casilla, index) => (
          
          <div key={index} className={`casilla ${casilla.beforeShot ? 'hundido' : casilla.beforeShot === false ? 'aguita' : ''}`} onClick={() => { countShot(index) }}></div>

        ))}
      </div>
    </>



  );
};

export default Board
