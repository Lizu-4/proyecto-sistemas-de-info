import img from '../img/ingresar.jpg';
import logo from '../img/UNIMET_neg.png';
import styles from './Ingresar.module.css';
import { useState } from 'react';
import { useUser } from '../context/user';
import { loginWithCredentials,ingresarGoogleEstudiante } from '../controllers/auth';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export default function Ingresar() {
    const user = useUser();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    function botonIniciarSesion(){
        //Si user == null entonces no hay sesion iniciada.En caso contrario hay una sesion iniciada.
        if( user == null){
            //esta funcion detecta el cambio de usuario y te lleva a agrupaciones
            onAuthStateChanged(auth,(user) =>{
                if(user !== null){
                    navigate('/agrupaciones');
                }
            });
            //verifica las credenciales y de ser validas, cambiara el estado de user
            loginWithCredentials(email,password);
        }else{
            alert("Actualmente hay una sesion iniciada.Cierra sesion para iniciar con otro usuario.");
        }
    }

    function botonIniciarSesionGoogle(){
        //Si user == null entonces no hay sesion iniciada.En caso contrario hay una sesion iniciada.
        if( user == null){
            //esta funcion detecta el cambio de usuario y te lleva a agrupaciones
            onAuthStateChanged(auth,(user) =>{
                if(user !== null){
                    navigate('/agrupaciones');
                }
            });
            //verifica las credenciales y de ser validas, cambiara el estado de user
            ingresarGoogleEstudiante();
        }else{
            alert("Actualmente hay una sesion iniciada.Cierra sesion para iniciar con otro usuario.");
        }
    }

    return (
    <div className={styles.div_principal}>
        <div>{/**PARTE IZQUIERDA(IMAGEN) */}
            <img width="100%" height="100%"  src={img} ></img>
        </div>
        <div style={{ margin:'8%' }}>{/**PARTE DERECHA */}
            {/**ENCABEZADO */}
            <div className={styles.encabezado}>
                <img width="40%" height="40%"  src={logo} ></img>
                <p>BIENVENIDO</p>
            </div>
            {/**INPUTS */}
            <div className={styles.div_inputs}>
                <input 
                type="text" 
                placeholder="Usuario"
                onChange={(ev) => setEmail(ev.target.value)}
                />
                <input 
                type="text" 
                placeholder="Contraseña"
                onChange={(ev) => setPassword(ev.target.value)}
                />
            </div>
            {/**ENLACES A OTRAS PAGINAS */}
            <div className={styles.div_enlaces}>
                <a href="">¿Olvidaste tu contraseña?</a>
                <button onClick={() => botonIniciarSesion()}>Iniciar sesion</button>
                <a href="/Registrar">Crear Mi Cuenta</a>
            </div>
            {/**INICIO DE SESION MEDIANTE PROVEEDORES */}
            <div>
                <hr className={styles.linea_horizontal}/>
                <button onClick={() => botonIniciarSesionGoogle()}>GOOGLE</button>
                <button>FACEBOOK</button>
            </div>
        </div>
    </div>
    );
  }