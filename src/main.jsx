import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import CountryPage from './pages/CountryPage';
import './scss/main.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFound />,
  },
  {
    // temporary solution to layout and style page and have access to it
    path: '/:slug',
    element: <CountryPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
