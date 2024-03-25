import styles from './Registro.module.css';
import { useState } from 'react';
import { ingresarGoogleEstudiante, registerWithCredentialsStudent } from '../controllers/auth';
import { auth,facebookProvider } from '../firebase';
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { ingresarFacebookEstudiante } from '../controllers/auth';

export default function RegistroEstudiante() {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nameError, setNameError] = useState("");
    const [numberError, setNumberError] = useState("");

    function register(){
        // Set initial error values to empty
        setEmailError("");
        setPasswordError("");
        setNameError("");


        // Check if the user has entered both fields correctly
        if(name === ""){
            setNameError("Por favor coloca tu nombre y apellido");
            return;
        }

        if ("" === email) {
            setEmailError("Por favor coloca tu email");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Por favor coloca un email valido");
            return;
        }

        if (!/^\d+$/.test(number)) {
            setNumberError("El teléfono no debe contener letras");
            return;
        }
    
        if ("" === password) {
            setPasswordError("Por favor ingresa una contraseña");
            return;
        }
    
        if (password.length < 7) {
            setPasswordError("La contraseña debe tener al menos 8 caracteres");
            return;
        }
        registerWithCredentialsStudent(email,password,name,number);
    }
    
    return (
    <div className={styles.div_principal}>
        <div style={{ margin:'2%' }}>
            {/**INPUTS */}
            <div className={styles.div_inputs}>
            <input 
                type="text" 
                placeholder="Nombre y Apellido"
                className={styles.inputBox}
                onChange={(ev) => setName(ev.target.value)}
                />
                <label className={styles.errorLabel}>{nameError}</label>
                <br />

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
                <br />

                <input 
                type="text" 
                placeholder="Telefono"
                className={styles.inputBox}
                onChange={(ev) => setNumber(ev.target.value)}
                />
                <label className={styles.errorLabel}>{numberError}</label>
                <br />
            </div>
            {/**ENLACES A OTRAS PAGINAS */}
            <div className={styles.div_enlaces}>
                <button className={styles.button} onClick={() => register()}>Registrarme</button>
                
            </div>
            {/**INICIO DE SESION MEDIANTE PROVEEDORES */}
            <div>
                <hr className={styles.linea_horizontal}/>
                <button onClick={() => ingresarGoogleEstudiante()}>GOOGLE</button>
                <button onClick={() => ingresarFacebookEstudiante()}>FACEBOOK</button>
            </div>
        </div>
    </div>
    );
}