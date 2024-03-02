import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Root from "./layout/Roots.jsx";
import Agrupaciones from './pages/Agrupaciones'
import { routes } from "./constants/routes";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: routes[0].path,
        element: <Home />,
      },
      {
        path: routes[1].path,
        element: <Agrupaciones />,
      },
    ],
  },
]);