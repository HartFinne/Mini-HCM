import {BrowserRouter, Routes, Route} from "react-router-dom"

// public pages
import PublicRoute from "../components/PublicRoute"
import Register from "../pages/public/Register"
import Login from "../pages/public/Login"

// user pages
import UserRoute from "../components/UserRoute"
import Home from "../pages/user/Home"

// admin pages
import AdminRoute from "../components/AdminRoute"
import AdminHome from "../pages/admin/AdminHome"


const AppRouter = () => {
  return (
    <BrowserRouter>
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
            <Home/>
          </UserRoute>}>
        </Route>

        <Route path="/admin-home" element={
          <AdminRoute>
            <AdminHome/>
          </AdminRoute>
        }></Route>


      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter