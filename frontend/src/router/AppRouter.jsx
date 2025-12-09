import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "../pages/Register"
import Login from "../pages/Login"


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter