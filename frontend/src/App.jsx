import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Signup from './pages/SignUp'
import PrivateRoute from './components/privateRoute'
import Profile from './pages/profilePage'
import CreateYourSpace from './pages/createYourSpace'
import TaskCreate from './pages/tasks'
import NotFound from './pages/NotFound'

const App = () => {

  
  return (
    <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/login' element={<LogIn></LogIn>}></Route>
    <Route path='/signup' element={<Signup></Signup>}  ></Route>
    <Route path='/profile' element={<PrivateRoute><Profile></Profile></PrivateRoute>}></Route>
    <Route path='/create-your-space' element={<PrivateRoute><CreateYourSpace></CreateYourSpace></PrivateRoute>}></Route>
    <Route path='/createtask' element={<PrivateRoute><TaskCreate></TaskCreate></PrivateRoute>}></Route>
    <Route path='*' element={<NotFound></NotFound>}></Route>

   </Routes>
  )
}

export default App