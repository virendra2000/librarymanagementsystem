import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import './App.css'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registration" element={<Register/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
