import { useUser } from '../context/user';
import styles from './Perfil.module.css';
import { Link } from 'react-router-dom';
import { Estudiante } from '../objetos/Estudiante';
import GrupoName from '../components/GrupoName';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useGrupos } from "../hooks/grupos";
import cargando from '../img/cargando.gif';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Perfil() {
  const {user,setUser} = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  //cada vez que el auth cambie pasara por aqui
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user === null) {
            navigate("/Ingresar");  
        }
      });
  }, []);

  useEffect(() => {
    if(user === null){
      setLoading(true);
    }
    if(user !== null){
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
        <img width="40%" height="20%" src={cargando}/>
      </div>
    );
   }

  return (
    <div className={styles.div_principal}>
      {/* primer div */}
      <div className={styles.parte_superior}>
        <div className={styles.primer_div_de_parte_superior}>
          <div className='d-flex'>
            
            <img className={styles.avatar} src={user.picture} ></img>
            {/* {user instanceof Estudiante?
            <p style={{textAlign:"center", fontSize:"100%"}}>Estudiante</p>:
            <p style={{textAlign:"center", fontSize:"100%"}}>Administrador</p>} */}
            <div className={styles.titleContainer}>
              {/* <p style={{color: "#4BC3B5"}}> {user instanceof Estudiante ? "Estudiante":"Administrador"}</p> */}
              <p style={{fontSize:"60%", marginBottom:"0px", fontWeight: "bolder"}}> {user.name} </p>
              <hr className='line' style={{margin: "2px"}}/>
              <p style={{ fontSize: "30%"}}>{user.email}</p>
              <p style={{ fontSize: "30%", marginTop: "-10px"}}> {user.number} </p>
            </div>
            <Link to="/EditarPerfil" style={{marginLeft:"auto"}}>
            <i class="fa-solid fa-pen-to-square" style={{color: '#f68b3e', fontSize: '4rem'}}></i>
            </Link>
          </div>
         
        </div>
        <div className={styles.segundo_div_de_parte_superior}>
        
        </div>
      </div>
      {/* Parte inferior */}
      <div className={styles.parte_inferior}>
      { user instanceof Estudiante ?
        <div className="agrupaciones" style={{backgroundColor: "#f0f2ff"}}>  
          <div className='title' style={{backgroundColor: "#000A62", width: "100%"}}> 
            <p style={{ fontSize: "25px", color: "white", marginLeft: "15px", padding: "9px"}}>Agrupaciones </p>   
          </div>
          <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", borderRadius: "7px 7spx 0px 0px", marginLeft: "18px"}}>
          {user.agrupaciones.map((index) => (
              <GrupoName
              key={index}
              id={index}
              />
                ))} 
          </div>

           
          </div> : 
                
              <button type="button" className="btn btn-primary" style={{ backgroundColor: "#1C2C54", width: "100%", marginBottom: "-20px", marginTop: "5px"}}>ADMINISTRADOR</button> }
          </div>
    </div>
  );
}
