import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import './App.css'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'
import AddBook from './Components/AddBook'
import SearchBook from './Components/SearchBook'
import BookDetails from './Components/BookDetails'
import BookDeposit from './Components/BookDeposit'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registration" element={<Register/>} />
          <Route path="/addbook" element={<AddBook/>} />
          <Route path="/search" element={<SearchBook/>} />
          <Route path="/book/:bookId" element={<BookDetails/>}/>
          <Route path="/book/return" element={<BookDeposit/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
