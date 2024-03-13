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
    const {user, setUser} = useUser();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();


    function botonIniciarSesion(){
        // Set initial error values to empty
        setEmailError("");
        setPasswordError("");
        //Si user == null entonces no hay sesion iniciada.En caso contrario hay una sesion iniciada.
        if( user == null){
            // Check if the user has entered both fields correctly
            if ("" === email) {
                setEmailError("Por favor coloca tu email");
                return;
            }
        
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                setEmailError("Por favor coloca un email valido");
                return;
            }
        
            if ("" === password) {
                setPasswordError("Por favor ingresa una contraseña");
                return;
            }
        
            if (password.length < 7) {
                setPasswordError("La contraseña debe tener al menos 7 caracteres");
                return;
            }
            loginWithCredentials(email,password);
            //navigate("/Clubes");
        }else{
            alert("Actualmente hay una sesion iniciada.Cierra sesion para iniciar con otro usuario.");
        }
    }

    async function botonIniciarSesionGoogle(){
        //Si user == null entonces no hay sesion iniciada.En caso contrario hay una sesion iniciada.
        if( user == null){
            //verifica las credenciales y de ser validas, cambiara el estado de user
            //ingresarGoogleEstudiante();
            //ingresarGoogleAdmi();

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
                placeholder="Email"
                onChange={(ev) => setEmail(ev.target.value)}
                />
                <label className={styles.errorLabel}>{emailError}</label>
                <br />
                <input 
                type="text" 
                placeholder="Contraseña"
                onChange={(ev) => setPassword(ev.target.value)}
                />
                <label className={styles.errorLabel}>{passwordError}</label>
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