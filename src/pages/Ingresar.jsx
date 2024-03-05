import img from '../img/ingresar.jpg';
import logo from '../img/UNIMET_neg.png';
import styles from './Ingresar.module.css';
import { UserContext } from '../context/user';
import { useContext } from 'react';
import { useUser } from '../context/user';

export default function Ingresar() {
    const user = useContext(UserContext);
    //const setUser = useContext(UserContext);
    //const user = useUser();
    //const { user, setUser } = useContext(UserContext);
    async function iniciarSesionGoogle(){
        console.log(user.name);
        //console.log(u);
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
                <input type="text" placeholder="Usuario"/>
                <input type="text" placeholder="Contraseña"/>
            </div>
            {/**ENLACES A OTRAS PAGINAS */}
            <div className={styles.div_enlaces}>
                <a href="">¿Olvidaste tu contraseña?</a>
                <button>Iniciar sesion</button>
                <a href="">Crear Mi Cuenta</a>
            </div>
            {/**INICIO DE SESION MEDIANTE PROVEEDORES */}
            <div>
                <hr className={styles.linea_horizontal}/>
                <button onClick={iniciarSesionGoogle}>GOOGLE</button>
                <button>FACEBOOK</button>
            </div>
        </div>
    </div>
    );
  }