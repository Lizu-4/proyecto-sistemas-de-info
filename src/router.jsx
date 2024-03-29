import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Root from "./layout/Roots.jsx";
import Agrupaciones from './pages/Agrupaciones'
import Ingresar from './pages/Ingresar.jsx';
import { routes } from "./constants/routes";
import Registrar from "./pages/Registrar.jsx";
import RegistroEstudiante from './pages/RegistroEstudiante.jsx';
import RegistroAdministrador from './pages/RegistroAdministrador.jsx';
import Perfil from "./pages/Perfil.jsx";
import RecuperarClave from "./pages/RecuperarClave.jsx";
import Grupo from "./pages/Grupo.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditarPerfil from "./pages/EditarPerfil.jsx";
import EditarGrupo from "./pages/EditarGrupo.jsx";
import CrearGrupo from "./pages/CrearGrupo.jsx";
import CrearTipo from "./pages/CrearTipo.jsx";
import EditarTipo from "./pages/EditarTipo.jsx";



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
      {
        path: routes[2].path,
        element: <Ingresar />,
      },
      {
        path: routes[3].path,
        element: <Registrar />,
        children: [
          {
            path: routes[3]["children"][0].path,
            element: <RegistroEstudiante />,
          },
          {
            path: routes[3]["children"][1].path,
            element: <RegistroAdministrador />,
          },
        ],
      },
      {
        path: routes[4].path,
        element: <Perfil />,
      },
      {
        path: routes[5].path,
        element: <RecuperarClave />,
      },
      {
        path: routes[6].path,
        element: <Grupo />,
      },
      {
        path: routes[7].path,
        element: <Dashboard />,
      },
      {
        path: routes[8].path,
        element: <EditarPerfil />,
      },
      {
        path: routes[9].path,
        element: <EditarGrupo />,
      },
      {
        path: routes[10].path,
        element: <CrearGrupo />,
      },
      {
        path: routes[11].path,
        element: <EditarTipo />,
      },
      {
        path: routes[12].path,
        element: <CrearTipo />,
      }
    ],
  },
]);