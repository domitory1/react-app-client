import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './Menu';
import Busket from './Busket';
import ErrorPage from './components/ErrorPage/errorPage';

const router = createBrowserRouter([
    {   // Root router
        path: "/",
        element: <Busket/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/busket",
        element: <Menu/>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);