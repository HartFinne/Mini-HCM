import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import PublicRoute from './components/PublicRoute'
import Login from './pages/public/Login'
import Register from "./pages/public/Register"

// user pages
import UserRoute from "./components/UserRoute"
import Navbar from './components/Navbar'
import Home from "./pages/user/Home"


function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={
          <PublicRoute>
            <Login/>
          </PublicRoute>}>
        </Route>

        <Route path="/register" element={
          <PublicRoute>
            <Register/>
          </PublicRoute>}>
        </Route>

        <Route path="/home" element={
          <UserRoute>
            <Navbar/>
            <Home/>
          </UserRoute>}>
        </Route>

        
      </Routes>
    </>
  )
}


export default App
