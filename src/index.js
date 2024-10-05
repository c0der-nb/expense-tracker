import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import Login from './pages/Login/Login';
import Homepage from './pages/Homepage/Homepage';
import Register from './pages/Register/Register'

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element: <Homepage />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/homepage',
        element: <Homepage />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      preventDuplicate
      >
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
