import img from '../img/ingresar.jpg';
import logo from '../img/UNIMET_neg.png';
import styles from './Ingresar.module.css';
import { useState,useEffect } from 'react';
import { useUser } from '../context/user';
import { loginWithCredentials,ingresarGoogleEstudiante,ingresarFacebookEstudiante } from '../controllers/auth';
import {FacebookLoginButton,GoogleLoginButton} from 'react-social-login-buttons';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

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
            ingresarGoogleEstudiante();

        }else{
            alert("Actualmente hay una sesion iniciada.Cierra sesion para iniciar con otro usuario.");
        }
    }

    async function botonIniciarSesionFacebook(){
        //Si user == null entonces no hay sesion iniciada.En caso contrario hay una sesion iniciada.
        if( user == null){
            //verifica las credenciales y de ser validas, cambiara el estado de user,en caso de ser un nuevo usuario lo registrara como estudiante
            ingresarFacebookEstudiante();

        }else{
            alert("Actualmente hay una sesion iniciada.Cierra sesion para iniciar con otro usuario.");
        }
    }

    //cada vez que el auth cambie pasara por aqui
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            navigate("/");
        }
        });
    }, []);

    return (
    <div className={styles.div_principal}>
        <div>{/**PARTE IZQUIERDA(IMAGEN) */}
            <img width="100%" height="100%"  src={img} style={{ objectFit: 'fill'}}></img>
        </div>
        <div style={{ margin:'8%' }}>{/**PARTE DERECHA */}
            {/**ENCABEZADO */}
            <div className={styles.encabezado}>
                <img width="40%" height="40%"  src={logo} style={{ objectFit: 'fill'}}></img>
                <p style={{ fontWeight: "bolder" }}>BIENVENIDO</p>
            </div>
            {/**INPUTS */}
            <div className={styles.div_inputs}>
                <input 
                type="text" 
                placeholder="Email"
                className={styles.inputBox}
                onChange={(ev) => setEmail(ev.target.value)}
                />
                <label className={styles.errorLabel}>{emailError}</label>
                <br />
                <input 
                type="text" 
                placeholder="Contraseña"
                className={styles.inputBox}
                onChange={(ev) => setPassword(ev.target.value)}
                />
                <label className={styles.errorLabel}>{passwordError}</label>
                <a href="/RecuperarClave" style={{ color: "white" }}>¿Olvidaste tu contraseña?</a>
                <br />
                <button className={styles.button} onClick={() => botonIniciarSesion()}>Iniciar sesion</button>
            </div>
            {/**INICIO DE SESION MEDIANTE PROVEEDORES */}
            <div>
                <a href="/Registrar" style={{ color: "orange",fontWeight: "bolder" }}>Crear Mi Cuenta</a>
                <hr className={styles.linea_horizontal}/>
                <GoogleLoginButton onClick={() => botonIniciarSesionGoogle()}></GoogleLoginButton>
                <FacebookLoginButton onClick={() => botonIniciarSesionFacebook()}></FacebookLoginButton>
            </div>
        </div>
    </div>
    );
  }