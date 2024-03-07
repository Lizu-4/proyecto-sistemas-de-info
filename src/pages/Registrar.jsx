import img from '../img/ingresar.jpg';
import logo from '../img/UNIMET_neg.png';
import styles from './Ingresar.module.css';
import { useState } from 'react';
import { registerWithCredentials } from '../controllers/auth';


export default function Ingresar() {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [last_name, setLast_Name] = useState("");
    const [number, setNumber] = useState("");
    
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
                <input 
                type="text" 
                placeholder="Contraseña"
                onChange={(ev) => setPassword(ev.target.value)}
                />
                <input 
                type="text" 
                placeholder="Nombre"
                onChange={(ev) => setName(ev.target.value)}
                />
                <input 
                type="text" 
                placeholder="Apellido"
                onChange={(ev) => setLast_Name(ev.target.value)}
                />
                <input 
                type="text" 
                placeholder="Telefono"
                onChange={(ev) => setNumber(ev.target.value)}
                />
            </div>
            {/**ENLACES A OTRAS PAGINAS */}
            <div className={styles.div_enlaces}>
                <button onClick={() => registerWithCredentials(email,password,name,last_name,number)}>Crear Cuenta</button>
                {/* <button onClick={loginWithCredentials(email,password)}>Crear Cuenta</button> */}
                
            </div>
            {/**INICIO DE SESION MEDIANTE PROVEEDORES */}
            <div>
                <hr className={styles.linea_horizontal}/>
                <button>GOOGLE</button>
                <button>FACEBOOK</button>
            </div>
        </div>
    </div>
    );
  }