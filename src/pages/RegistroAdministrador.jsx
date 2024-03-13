import styles from './Registro.module.css';
import { useState } from 'react';
import { ingresarGoogleAdmi, registerWithCredentialsAdmi } from '../controllers/auth';

export default function RegistroAdministrador() {
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
    
        if ("" === password) {
            setPasswordError("Por favor ingresa una contraseña");
            return;
        }
    
        if (password.length < 7) {
            setPasswordError("La contraseña debe tener al menos 8 caracteres");
            return;
        }
        registerWithCredentialsAdmi(email,password,name,number);
    }
    
    return (
    <div className={styles.div_principal}>
        <div style={{ margin:'8%' }}>{/**PARTE DERECHA */}
            {/**INPUTS */}
            <div className={styles.div_inputs}>
            <input 
                type="text" 
                placeholder="Nombre y Apellido"
                onChange={(ev) => setName(ev.target.value)}
                />
                <label className={styles.errorLabel}>{nameError}</label>
                <br />

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
                <br />

                <input 
                type="text" 
                placeholder="Telefono"
                onChange={(ev) => setNumber(ev.target.value)}
                />
                <label className={styles.errorLabel}>{numberError}</label>
                <br />
            </div>
            {/**ENLACES A OTRAS PAGINAS */}
            <div className={styles.div_enlaces}>
                <button onClick={() => register()}>Crear Cuenta</button>
                
            </div>
            {/**INICIO DE SESION MEDIANTE PROVEEDORES */}
            <div>
                <hr className={styles.linea_horizontal}/>
                <button onClick={() => ingresarGoogleAdmi()}>GOOGLE</button>
                <button>FACEBOOK</button>
            </div>
        </div>
    </div>
    );
}