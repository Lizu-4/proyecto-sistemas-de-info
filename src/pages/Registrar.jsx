import styles from './Registrar.module.css';
import { NavLink, Outlet } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Registar() {
    const navigate = useNavigate();
    //cada vez que el auth cambie pasara por aqui
  useEffect(() => {
    const elemento = document.getElementById('estudiante');
    elemento.className = `${styles["nav-link"]} ${styles.active}`;
    navigate(routes[3]["children"][0].path);
  }, []);

    //cada vez que el auth cambie pasara por aqui
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            navigate("/");
        }
        });
    }, []);
    return (
        <div className={styles.d}>
            <header className={styles.header}>
                <p>Registro</p>
                <hr className={styles.linea_horizontal}/>
                <nav className={styles.nav}>
                    <NavLink
                        id='estudiante'
                        key={routes[3]["children"][0].path}
                        to={routes[3]["children"][0].path}
                        className={({ isActive }) =>
                        isActive
                            ? `${styles["nav-link"]} ${styles.active}`
                            : styles["nav-link"]
                        }
                    >
                        {routes[3]["children"][0].name}
                    </NavLink>
                    <NavLink
                        key={routes[3]["children"][1].path}
                        to={routes[3]["children"][1].path}
                        className={({ isActive }) =>
                        isActive
                            ? `${styles["nav-link"]} ${styles.active}`
                            : styles["nav-link"]
                        }
                    >
                        {routes[3]["children"][1].name}
                    </NavLink>
                </nav>
            </header>
            <Outlet/>
      </div>
    );
  }