import { Routes, Route } from 'react-router-dom'
import BoardsList from '../../components/BoardsList/BoardsList'

export default function BoardsPage() {

    return (
        <>
            <h1>Boards Page</h1>
            <Routes>
                    <Route path="/" element={<BoardsList />} />
            </Routes>
        </>
    )
}