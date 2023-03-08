import BoardDetail from '../../components/BoardDetail/BoardDetail'
import BigSteps from '../../components/BigSteps/BigSteps'

export default function BoardsList({user}) {

    return (
        <>
            <h1>Boards List</h1>
            <BoardDetail user={user} />
            <BigSteps user={user} />
        </>
    )
}