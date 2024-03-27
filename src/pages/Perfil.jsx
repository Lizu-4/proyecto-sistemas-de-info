import { useUser } from '../context/user';
import styles from './Perfil.module.css';
import { Link } from 'react-router-dom';
import { Estudiante } from '../objetos/Estudiante';
import GrupoName from '../components/GrupoName';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useGrupos from "../hooks/useGrupos";
import cargando from '../img/cargando.gif';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Perfil() {
  const {user,setUser} = useUser();
  const navigate = useNavigate();

  //cada vez que el auth cambie pasara por aqui
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user === null) {
            navigate("/Ingresar");  
        }
      });
  }, []);

  const {grupoStatus,} = useGrupos();
  const grupos = grupoStatus.data;

  if (grupoStatus.status === "loading" ) {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
          <img width="40%" height="20%" src={cargando}/>
        </div>
    );
  } else if (grupoStatus.status === "error" ) {
    return <div>Error al cargar los datos</div>;
  }

  return (
   
    <div className={styles.div_principal}>
      {/* primer div */}
      <div className={styles.parte_superior}>
        <div className={styles.primer_div_de_parte_superior}>
          <div>
            <img className={styles.avatar} src={user.picture} ></img>
            {user instanceof Estudiante?
            <p style={{textAlign:"center", fontSize:"100%"}}>Estudiante</p>:
            <p style={{textAlign:"center", fontSize:"100%"}}>Administrador</p>}
          </div>
          <div className={styles.titleContainer}>
            {/* <p style={{color: "#4BC3B5"}}> {user instanceof Estudiante ? "Estudiante":"Administrador"}</p> */}
            <p style={{fontSize:"60%"}}> {user.name} </p>
            <p style={{ fontSize: "30%"}}>{user.email}</p>
            <p style={{ fontSize: "30%"}}> {user.number} </p>
          </div>
        </div>
        <div className={styles.segundo_div_de_parte_superior}>
        <Link to="/EditarPerfil">
            <button className={styles.button}>Editar Perfil</button>
        </Link>
        </div>
      </div>
      {/* Parte inferior */}
      <div>
      { user instanceof Estudiante ?
        <div className="agrupaciones">  
        <p style={{ fontSize: "25px", color: "#D175B7"}}>Miembro de: </p>   
        {user.agrupaciones.map((index) => (
          <GrupoName
          key={index}
          id={index}
          />
            ))} </div> :  <p style={{ fontSize: "25px", color: "#D175B7"}}> ADMINISTRADOR </p>  }
      </div>
    </div>
  );
}
