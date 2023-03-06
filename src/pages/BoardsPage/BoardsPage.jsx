import { Outlet } from 'react-router-dom'
import BigSteps from '../../components/BigSteps/BigSteps';

export default function BoardsPage() {

    return (
        <>
            <h1>Boards Page</h1>
            <Outlet />
            <BigSteps />
        </>
    )
}