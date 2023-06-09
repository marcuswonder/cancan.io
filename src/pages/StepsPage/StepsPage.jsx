import { Routes, Route } from 'react-router-dom'
import BigSteps from '../../components/BigSteps/BigSteps'
import BabySteps from '../../components/BabySteps/BabySteps'


export default function Steps({ user, board, setBoard, bigStep, setBigStep, bigSteps, setBigSteps}) {
    
    return (
        <>
            <Routes>
                <Route path="/" element={<BigSteps user={user} board={board} bigSteps={bigSteps} setBigSteps={setBigSteps} /> } />
                <Route path="/:bigStepName" element={<BabySteps user={user} board={board} setBoard={setBoard} bigStep={bigStep} setBigStep={setBigStep} /> } />
            </Routes>
        </>
    )

}