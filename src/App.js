
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages/Home';
import Modify from './pages/Modify';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Header from './components/Header/Header'

  
function App() {
return (
    <Router>
        <Header />
          <Routes>
                <Route path='/' element={<Login/>} />
                <Route exact path='/Home' element={<Home />} />
                <Route exact path='/Modify/:id' element={<Modify />} />
                <Route path='/Signin' element={<Signin/>} />
          </Routes>
    </Router>
);
}

export default App;