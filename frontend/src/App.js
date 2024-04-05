import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Mvpmetrics from './pages/Mvpmetrics';
import './stylesheet.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Home />} />
        <Route path='/results' element={<Mvpmetrics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
