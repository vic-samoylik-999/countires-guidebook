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
        <Route path="/" element={<Layout />} errorElement={<NotFound />}>
          <Route index path="/" element={<MainPage />} />
          <Route path=":slug" element={<CountryPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
