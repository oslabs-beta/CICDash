import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mvpmetrics from './pages/Mvpmetrics';
import './stylesheet.css';
import Enterinfo from './pages/Enterinfo';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/results' element={<Mvpmetrics />} />
        <Route path='/enterInfo' element={<Enterinfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
