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
        <ProtectedRoute>
          <Route path='/results' element={<Mvpmetrics />} />
        </ProtectedRoute>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
