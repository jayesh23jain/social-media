import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login.jsx"
import Signup from "./pages/signup.jsx"
import Home from "./pages/home.jsx"
import Landing from "./pages/landing.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import PublicRoute from "./components/PublicRoute.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
