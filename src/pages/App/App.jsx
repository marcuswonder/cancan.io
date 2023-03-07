import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import NavBar from '../../components/NavBar/NavBar'
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
            <Route path="/boards" element={<BoardsList />} />
            <Route path="/boards/:boardName" element={<BoardDetail />} />
            <Route path="/boards/new" element={<NewBoardPage  userProp={userProp} />} />
            <Route path="/boards/:boardName/update" element={<UpdateBoardPage  userProp={userProp} />} />
            {/* <Route path="/boards/:boardName/big-steps" element={<BigSteps />} /> */}
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}