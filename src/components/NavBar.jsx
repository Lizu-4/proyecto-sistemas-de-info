import logo from '../img/UNIMET_neg.png'
import { routes } from "../constants/routes";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css"

export default function NavBar() {
    return (
     

      <header className={styles.header}>
      <img className="logo" width="100px" height="40px"  src={logo} ></img>

      <nav className={styles.nav}>
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
      </nav>
    </header>
      );
    }
    styles["nav-link"];
    

      //   <nav className="navbar navbar-dark" style={{ backgroundColor: '#000A62' }}>
      //   <div className="container-fluid">
      //       <div className='navbar-brand'>
      //           <img className="logo" width="100px" height="40px" src={logo} ></img>
      //       </div>
      //       <ul className="navbar-nav">
      //         <li className="nav-item">
      //         {routes.map((route) => (
      //           <NavLink
      //             key={route.path}
      //             to={route.path}
      //             className="nav-link"
      //           >
      //             {route.name}
      //           </NavLink>
      //   ))}
      //         </li> 
      // </ul>
           
      //   </div>
      // </nav> 

