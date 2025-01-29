
import './App.css'
import Admin from "./components/Admin.jsx";
import Schedule from './components/Schedule';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Router>

    </>
  )
}

export default App
