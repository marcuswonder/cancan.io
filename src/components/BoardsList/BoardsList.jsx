import '../../pages/App/App.css';
import AuthorBoardsList from '../AuthorBoardsList/AuthorBoardsList';
import UserBoardsList from '../UserBoardsList/UserBoardsList';

export default function BoardsList({ user }) {

    return (
        <>
            <AuthorBoardsList user={user} />
            <UserBoardsList />
        </>
    )
}