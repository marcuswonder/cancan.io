import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import NavBar from '../../components/NavBar/NavBar'
import BoardsPage from '../BoardsPage/BoardsPage';
import BoardsList from '../../components/BoardsList/BoardsList'
import BoardDetail from '../../components/BoardDetail/BoardDetail'
import NewBoardPage from '../NewBoardPage/NewBoardPage';
import UpdateBoardPage from '../UpdateBoardPage/UpdateBoardPage';
import AuthPage from '../AuthPage/AuthPage';

export default function App() {
  const [ user, setUser ] = useState(getUser())
  const userProp = user

  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* <Route path="/boards" element={<BoardsPage />} /> */}
            <Route path="/boards" element={<BoardsPage />} >
              <Route path="" element={<BoardsList />} />
              <Route path=":boardName" element={<BoardDetail />} />
            </Route>
            <Route path="/boards/new" element={<NewBoardPage  userProp={userProp} />} />
            <Route path="/boards/:boardName/update" element={<UpdateBoardPage  userProp={userProp} />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}