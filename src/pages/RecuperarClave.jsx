import styles from './RecuperarClave.module.css';
import { useState } from 'react';
import { cambiarContrasena, ingresarGoogleEstudiante, registerWithCredentialsStudent } from '../controllers/auth';

export default function RegistroEstudiante() {
    const [email,setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    function handleClick(){
        // Set initial error values to empty
        setEmailError("");


        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Por favor coloca tu email");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Por favor coloca un email valido");
            return;
        }
    
        cambiarContrasena(email);
    }
    
    return (
    <div className={styles.div_principal}>
        <p>Ingrese los datos requeridos y presione "Continuar" para establecer una nueva clave</p>
        <div className={styles.div}>
            <div className={styles.div_inputs}>
                <input 
                type="text" 
                placeholder="Email"
                className={styles.inputBox}
                onChange={(ev) => setEmail(ev.target.value)}
                />
                <label className={styles.errorLabel}>{emailError}</label>
                <br />
            </div>
            <div className={styles.div_enlaces}>
                <button className={styles.button} onClick={() => handleClick()}>Continuar</button>  
            </div>
        </div>
    </div>
    );
}