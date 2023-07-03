import React, { useEffect, useState } from 'react'
import Board from '../board/Board'

const Score = ({board}) => {
    const [score, setScore] = useState(50)
   
 useEffect(()=>{
  
    
 },[board])


  return (
    <div>
      <h2>Puntuacion: {score}</h2>
    </div>
  )
}

export default Score
