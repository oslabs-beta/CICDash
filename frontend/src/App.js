import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mvpmetrics from './pages/Mvpmetrics';
import ProtectedRoute from './components/ProtectedRoute';
import './stylesheet.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoute/>}>
          <Route path='/results' element={<Mvpmetrics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
