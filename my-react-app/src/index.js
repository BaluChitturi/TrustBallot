import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Ver from './pages/Ver';
import Voters from './pages/Voters';
import About from './pages/About'; // Import the About component
import Help from './pages/Help'; // Import the Help component
import 'bootstrap/dist/css/bootstrap.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/verification", // Update path to include leading slash
    element: <Ver/>,
  },
  {
    path: "/Voters", // Update path to include leading slash
    element: <Voters/>,
  },
  {
    path: "/about", // Add About route
    element: <About/>,
  },
  {
    path: "/help", // Add Help route
    element: <Help/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
