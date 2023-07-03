import React from 'react'
import { useState } from 'react';
import { juego } from '../board/level';
import Board from '../board/Board';

const Game = () => {
  const [nivel, setNivel] = useState('Fácil');

  const handleSelectChange = (event) => {
    setNivel(event.target.value);
  };

  return (
    <div>
       <select onChange={handleSelectChange}>
                {juego.map((x, index) => {
                    return (<option key={index}>{x.nivel}</option>)
                })}
            </select>
            <Board nivel={nivel} />
    </div>
  )
}

export default Game
