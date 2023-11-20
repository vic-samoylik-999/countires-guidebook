import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import MainPage from './pages/MainPage';
import CountryPage from './pages/CountryPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:slug" element={<CountryPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
