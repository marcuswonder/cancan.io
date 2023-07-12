import { Routes, Route } from 'react-router-dom'
import BigSteps from '../../components/BigSteps/BigSteps'
import BabySteps from '../../components/BabySteps/BabySteps'


export default function Steps({ user, board, boardId, boardAdmins, setBoard, bigSteps, setBigSteps, bigStep, setBigStep}) {
    
    return (
        <>
            <Routes>
                <Route path="/" element={<BigSteps user={user} board={board} bigSteps={bigSteps} setBigSteps={setBigSteps} /> } />
                <Route path="/:bigStepName" element={<BabySteps user={user} board={board} boardId={boardId} boardAdmins={boardAdmins} setBoard={setBoard} bigSteps={bigSteps} setBigSteps={setBigSteps} bigStep={bigStep} setBigStep={setBigStep} /> } />
            </Routes>
        </>
    )

}