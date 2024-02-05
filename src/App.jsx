import { Route, Routes, Navigate } from "react-router-dom"
import OTPVerify from "./pages/OTPVerify"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import Rating from "./components/Rating"

function App() {
const users = JSON.parse(localStorage.getItem('users')) || []
const user = users.find(user => user.isLogin);
  return (
    <Routes>
      <Route path="/" element={user ? <Dashboard /> : <Navigate to={`/signin`} />} />
      <Route path="/verify" element={user ? <Navigate to={`/`} /> : <OTPVerify />} />
      <Route path="/signup" element={user ? <Navigate to={`/`} /> : <SignUp />} />
      <Route path="/signin" element={user ? <Navigate to={`/`} /> : <SignIn />} />

      <Route path="/rating" element={<Rating/>} />
    </Routes>
  )
}

export default App
