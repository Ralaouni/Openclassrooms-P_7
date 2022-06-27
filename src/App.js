
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/Header/Header'
import Error from './components/Error/Error'

  
function App() {
return (
    <Router>
        <Header />
          <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/Login' element={<Login/>} />
          </Routes>
    </Router>
);
}

export default App;