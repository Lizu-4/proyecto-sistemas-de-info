import styles from './Registro.module.css';
import { useState } from 'react';
import { ingresarGoogleAdmi, registerWithCredentialsAdmi } from '../controllers/auth';

export default function RegistroAdministrador() {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    
    return (
    <div className={styles.div_principal}>
        <div style={{ margin:'8%' }}>{/**PARTE DERECHA */}
            {/**INPUTS */}
            <div className={styles.div_inputs}>
                <input 
                type="text" 
                placeholder="Email"
                onChange={(ev) => setEmail(ev.target.value)}
                />
                <input 
                type="text" 
                placeholder="Contraseña"
                onChange={(ev) => setPassword(ev.target.value)}
                />
                <input 
                type="text" 
                placeholder="Nombre y Apellido"
                onChange={(ev) => setName(ev.target.value)}
                />
                <input 
                type="text" 
                placeholder="Telefono"
                onChange={(ev) => setNumber(ev.target.value)}
                />
            </div>
            {/**ENLACES A OTRAS PAGINAS */}
            <div className={styles.div_enlaces}>
                <button onClick={() => registerWithCredentialsAdmi(email,password,name,number)}>Crear Cuenta</button>
                
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