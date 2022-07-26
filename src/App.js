
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages/Home';
import Modify from './pages/Modify';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Header from './components/Header/Header'
// import Error from './components/Error/Error'

  
function App() {
return (
    <Router>
        <Header />
          <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/Modify/:id' element={<Modify />} />
              <Route path='/Login' element={<Login/>} />
              <Route path='/Signin' element={<Signin/>} />
          </Routes>
    </Router>
);
}

export default App;