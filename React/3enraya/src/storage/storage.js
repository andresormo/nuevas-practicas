export const saveGameToStorage = ({board, turn})=>{
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const savesStateToStorage = ({board, turn})=>{
    const boardFromStorage = board ? window.localStorage.getItem('board') : null;
    const turnFromStorage = turn ? window.localStorage.getItem('turn') : null;
    return  board ? boardFromStorage : turnFromStorage
    
}


export const resetGameToStorage =()=>{
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}