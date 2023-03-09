import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import NavBar from '../../components/NavBar/NavBar'
import SplashPage from '../../components/SplashPage/SplashPage'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'
import BoardsList from '../../components/BoardsList/BoardsList'
import BoardPage from '../../pages/BoardPage/BoardPage'
import AddBigStepPage from '../../pages/AddBigStepPage/AddBigStepPage'
import UpdateBigStepPage from '../../pages/UpdateBigStepPage/UpdateBigStepPage'

import NewBoardPage from '../NewBoardPage/NewBoardPage';
import UpdateBoardPage from '../UpdateBoardPage/UpdateBoardPage';
import AuthPage from '../AuthPage/AuthPage';

export default function App() {
  const [ user, setUser ] = useState(getUser())

  return (
    <main className="App">
      
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/boards" element={<BoardsList />} />
            <Route path="/boards/:boardName" element={<BoardPage user={user} />} />
            <Route path="/boards/new" element={<NewBoardPage  user={user} />} />
            <Route path="/boards/:boardName/update" element={<UpdateBoardPage  user={user} />} />
            <Route path="/boards/:boardName/big-steps/add" element={<AddBigStepPage  user={user} />} />
            <Route path="/boards/:boardName/big-steps/:bigStepName/update" element={<UpdateBigStepPage  user={user} />} />
          </Routes>
        </>
        :
        <Routes>
          <Route path="/" element={<SplashPage user={user} setUser={setUser} />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
        </Routes>
      }
    </main>
  );
}