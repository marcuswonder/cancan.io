import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';

import BigSteps from '../../components/BigSteps/BigSteps'
import BabySteps from '../../components/BabySteps/BabySteps'


export default function Steps({ user, board, setBoard }) {
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(function() {
        async function getBoard() {
            setBoard(board)
        }
        getBoard()
        setIsLoading(false)
        
    }, [board])
    

    return (
        <>
            <Routes>
                {/* <Route path="" element={<BigSteps user={user} board={board} bigSteps={bigSteps} setBigSteps={setBigSteps} /> } />
                <Route path="/:bigStepName" element={<BabySteps user={user} board={board} bigSteps={bigSteps} setBigSteps={setBigSteps} /> } /> */}
                {!isLoading && <Route path="" element={<BigSteps user={user} board={board} setBoard={setBoard} /> } />}
                {!isLoading && <Route path="/:bigStepName" element={<BabySteps user={user} board={board} setBoard={setBoard} /> } />}
            </Routes>
        </>
    )
}