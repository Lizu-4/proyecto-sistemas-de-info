import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from './router.jsx';
import  NavBar  from './components/NavBar.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar></NavBar>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
