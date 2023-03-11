import { Routes, Route } from 'react-router-dom'

import BigSteps from '../../components/BigSteps/BigSteps'
import BabySteps from '../../components/BabySteps/BabySteps'


export default function Steps({ user, board, bigSteps, setBigSteps }) {

    return (
        <>
            <Routes>
                <Route path="" element={<BigSteps user={user} board={board} bigSteps={bigSteps} setBigSteps={setBigSteps} /> } />
                <Route path="/:bigStepName" element={<BabySteps user={user} board={board} bigSteps={bigSteps} setBigSteps={setBigSteps} /> } />
            </Routes>
        </>
    )
}