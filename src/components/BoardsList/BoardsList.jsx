import '../../pages/App/App.css';
import AdminBoardsList from '../AdminBoardsList/AdminBoardsList';
import UserBoardsList from '../UserBoardsList/UserBoardsList';

export default function BoardsList({ user }) {

    return (
        <>
            <AdminBoardsList user={user} />
            <UserBoardsList />
        </>
    )
}