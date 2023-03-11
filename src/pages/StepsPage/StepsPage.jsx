import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';

import BigSteps from '../../components/BigSteps/BigSteps'
import BabySteps from '../../components/BabySteps/BabySteps'


export default function Steps({ user, board, setBoard }) {
    
    useEffect(function() {
        async function getBoard() {
            setBoard(board)
        }
        getBoard()
    }, [board])
    

    return (
        <>
            <Routes>
                <Route path="" element={<BigSteps user={user} board={board} setBoard={setBoard} /> } />
                <Route path="/:bigStepName" element={<BabySteps user={user} board={board} setBoard={setBoard} /> } />
            </Routes>
        </>
    )
}