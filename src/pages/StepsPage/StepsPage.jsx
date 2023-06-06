import { Routes, Route } from 'react-router-dom'

import BigSteps from '../../components/BigSteps/BigSteps'
import BabySteps from '../../components/BabySteps/BabySteps'


export default function Steps({ user }) {    

    return (
        <>
            <Routes>
                <Route path="/" element={<BigSteps user={user} /> } />
                <Route path="/:bigStepName" element={<BabySteps user={user} /> } />
            </Routes>
        </>
    )
}