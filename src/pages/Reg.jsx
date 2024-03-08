import styles from './Reg.module.css';
import { NavLink } from "react-router-dom";
import { routes } from "../constants/routes";

export default function Reg() {
    
    return (
        <div className={styles.d}>
            <header className={styles.header}>
                <p>Registro</p>
                <nav className={styles.nav}>
                    <NavLink
                        key={routes[4]["children"][0].path}
                        to={routes[4]["children"][0].path}
                        className={({ isActive }) =>
                        isActive
                            ? `${styles["nav-link"]} ${styles.active}`
                            : styles["nav-link"]
                        }
                    >
                        {routes[4]["children"][0].name}
                    </NavLink>
                    <NavLink
                        key={routes[4]["children"][1].path}
                        to={routes[4]["children"][1].path}
                        className={({ isActive }) =>
                        isActive
                            ? `${styles["nav-link"]} ${styles.active}`
                            : styles["nav-link"]
                        }
                    >
                        {routes[4]["children"][1].name}
                    </NavLink>
                </nav>
            </header>
      </div>
    );
  }