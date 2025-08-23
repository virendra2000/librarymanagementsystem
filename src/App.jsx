import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import './App.css'
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
function App() {
  return (
    <>
      <Router future={{ v7_startTransition: true , v7_relativeSplatPath: true}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/userdashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
