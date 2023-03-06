import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage';
import BoardsPage from '../BoardsPage/BoardsPage';
import NewBoardPage from '../NewBoardPage/NewBoardPage';
import NewBigStepPage from '../NewBigStepPage/NewBigStepPage';
import NavBar from '../../components/NavBar/NavBar'

export default function App() {
  const [ user, setUser ] = useState(getUser())

  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/boards/new" element={<NewBoardPage />} />
            <Route path="/boards/:boardName" element={<BoardsPage />} />
            <Route path="/boards/:boardName/big-steps/new" element={<NewBigStepPage />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}


