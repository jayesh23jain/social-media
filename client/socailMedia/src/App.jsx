import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login.jsx"
import Signup from "./pages/signup.jsx"
import Home from "./pages/home.jsx"
import Landing from "./pages/landing.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<Landing/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/signup" element = {<Signup/>}/>
            <Route path = "/home" element = {<Home/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
