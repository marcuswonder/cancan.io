import '../../pages/App/App.css';
import AuthorBoardsList from '../AuthorBoardsList/AuthorBoardsList';
import UserBoardsList from '../UserBoardsList/UserBoardsList';

export default function BoardsList() {

    return (
        <>
            <h1>Boards List</h1>
            <AuthorBoardsList />
            <UserBoardsList />
        </>
    )
}