import logo from '../img/UNIMET_neg.png'
import { routes } from "../constants/routes";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css"
import { useUser } from '../context/user';
import { Administrador } from '../objetos/Administrador';
import { logOut} from '../controllers/auth';

export default function NavBar() {
  
  const {user,setUser} = useUser();
 
    return (
     

      <header className={styles.header}>
      <img className="logo" width="100px" height="40px"  src={logo} ></img>

      {/* <nav className={styles.nav}>
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              isActive
                ? `${styles["nav-link"]} ${styles.active}`
                : styles["nav-link"]
            }
          >
            {route.name}
          </NavLink>
        ))}
      </nav> */}
        {user ? 
        <nav className={styles.nav}>
         <NavLink
            key={routes[0].path}
            to={routes[0].path}
            className={({ isActive }) =>
              isActive
                ? `${styles["nav-link"]} ${styles.active}`
                : styles["nav-link"]
            }
          >
            {routes[0].name}
          </NavLink>

          <NavLink
            key={routes[1].path}
            to={routes[1].path}
            className={({ isActive }) =>
              isActive
                ? `${styles["nav-link"]} ${styles.active}`
                : styles["nav-link"]
            }
          >
            {routes[1].name}
          </NavLink>

          <NavLink
            key={routes[4].path}
            to={routes[4].path}
            className={({ isActive }) =>
              isActive
                ? `${styles["nav-link"]} ${styles.active}`
                : styles["nav-link"]
            }
          >
            {routes[4].name}
          </NavLink>

          {user instanceof Administrador ? 
          
          <NavLink
            key={routes[7].path}
            to={routes[7].path}
            className={({ isActive }) =>
              isActive
                ? `${styles["nav-link"]} ${styles.active}`
                : styles["nav-link"]
            }
          >
            {routes[7].name}
          </NavLink> : null}

      </nav>
      
      :  <nav className={styles.nav}>
      <NavLink
      key={routes[0].path}
      to={routes[0].path}
      className={({ isActive }) =>
        isActive
          ? `${styles["nav-link"]} ${styles.active}`
          : styles["nav-link"]
      }
    >
      {routes[0].name}
    </NavLink>

    <NavLink
      key={routes[1].path}
      to={routes[1].path}
      className={({ isActive }) =>
        isActive
          ? `${styles["nav-link"]} ${styles.active}`
          : styles["nav-link"]
      }
    >
      {routes[1].name}
    </NavLink>

    <NavLink
      key={routes[2].path}
      to={routes[2].path}
      className={({ isActive }) =>
        isActive
          ? `${styles["nav-link"]} ${styles.active}`
          : styles["nav-link"]
      }
    >
      {routes[2].name}
    </NavLink>
    </nav>
      }

     
        {user && ( 
         <nav className={styles.nav}>
          <NavLink onClick={() => logOut()}
            className={({ isActive }) =>
              isActive
                ? `${styles["nav-link"]} ${styles.active}`
                : styles["nav-link"]
            }
          >
            Log Out
          </NavLink>
          </nav>
        )}



    </header>
      );
    }
    styles["nav-link"];
    

