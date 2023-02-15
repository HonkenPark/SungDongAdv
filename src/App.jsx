import './App.css';
import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import FM_0000200 from 'pages/FM_0000200';
import KingsKeypad from 'KingsKeypad';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/FM_0000200" element={<FM_0000200 />} />
          <Route path="/KingsKeypad" element={<KingsKeypad />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
