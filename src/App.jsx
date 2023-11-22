import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import CountryPage from './pages/CountryPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/countires-guidebook" element={<Layout />}>
          <Route index path="/countires-guidebook" element={<MainPage />} />
          <Route path="/countires-guidebook/:slug" element={<CountryPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
