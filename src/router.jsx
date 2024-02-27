import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Agrupaciones from './pages/Agrupaciones'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/agrupaciones',
    element: <Agrupaciones/>,
  },
]);
