import styles from './RecuperarClave.module.css';
import { useState } from 'react';
import { cambiarContrasena, ingresarGoogleEstudiante, registerWithCredentialsStudent } from '../controllers/auth';
import { TextField } from '@mui/material';

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
        <p>Ingrese los datos requeridos y presione "continuar" para establecer una nueva clave</p>
        <div style={{ margin:'8%' }}>
            {/**INPUTS */}
            <div className={styles.div_inputs}>
                <input 
                type="text" 
                placeholder="Email"
                onChange={(ev) => setEmail(ev.target.value)}
                />
                <label className={styles.errorLabel}>{emailError}</label>
                <br />
            </div>
            <br />
            <div className={styles.div_enlaces}>
                <button onClick={() => handleClick()}>continuar</button>  
            </div>
        </div>
    </div>
    );
}