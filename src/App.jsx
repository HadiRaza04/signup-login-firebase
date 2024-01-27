import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './Components/Signin'
import Signup from './Components/Signup'
import Home from './Components/Home'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to='/signup' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App