import { modificarAdministrador, modificarEstudiante} from '../controllers/auth';
import { useUser } from '../context/user';
import styles from './Perfil.module.css';
import { useState } from 'react';
import { Estudiante } from '../objetos/Estudiante';
import { Administrador } from '../objetos/Administrador';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function EditarPerfil(){
    const {user,setUser} = useUser();

    const [nuevo_nombre,setNuevo_nombre] = useState("");
    const [nuevo_telefono,setNuevo_telefono] = useState("");
    const [nueva_picture,setNueva_picture] = useState("");
    const [nameError, setNameError] = useState("");
    const [telefonoError, setTelefonoError] = useState("");
    const [pictureError, setPictureError] = useState("");

    const navigate = useNavigate();

    function cambiarNombre(){
        setNameError("");
        if(nuevo_nombre === ""){
          setNameError("Por favor coloca tu nuevo nombre");
          return;
        }else{
          if(user instanceof Estudiante){
            const user_modificado = {
              email: user.email,
              name: nuevo_nombre,
              number:user.number,
              picture:user.picture,
              agrupaciones:user.agrupaciones,    
            }
            modificarEstudiante(user_modificado);
            const nuevo_user = new Estudiante(nuevo_nombre,user.email,user.number,user.picture,user.agrupaciones);
            setUser(nuevo_user);
          }else if(user instanceof Administrador){
            const user_modificado = {
              email: user.email,
              name: nuevo_nombre,
              number:user.number,
              picture:user.picture,
            }
            modificarAdministrador(user_modificado);
            const nuevo_user = new Administrador(nuevo_nombre,user.email,user.number,user.picture);
            setUser(nuevo_user);
          }
          alert("Tu nombre se ha modificado con exito");
        }
      }
    
      function cambiarTelefono(){
        setTelefonoError("");
        if(nuevo_telefono === ""){
          setTelefonoError("Por favor coloca tu nuevo telefono");
          return;
        }else if (!/^\d+$/.test(nuevo_telefono)) {
            setTelefonoError("El nuevo teléfono no debe contener letras");
            return;
        }else{
          if(user instanceof Estudiante){
            const user_modificado = {
              email: user.email,
              name: user.name,
              number:nuevo_telefono,
              picture:user.picture,
              agrupaciones:user.agrupaciones,    
            }
            modificarEstudiante(user_modificado);
            const nuevo_user = new Estudiante(user.name,user.email,nuevo_telefono,user.picture,user.agrupaciones);
            setUser(nuevo_user);
          }else if(user instanceof Administrador){
            const user_modificado = {
              email: user.email,
              name: user.email,
              number:nuevo_telefono,
              picture:user.picture,
            }
            modificarAdministrador(user_modificado);
            const nuevo_user = new Administrador(user.name,user.email,nuevo_telefono,user.picture);
            setUser(nuevo_user);
          }
          alert("Tu numero se ha modificado con exito");
        }
      }
      function cambiarPicture() {
        setPictureError("");
        if (nueva_picture === "") {
          setPictureError("Por favor coloca tu nueva foto");
          return;
        } else {
          // Crea una instancia de FileReader para leer la imagen seleccionada
          const reader = new FileReader();
          //se asigna una función al evento onload del FileReader.Esta función se ejecutará cuando la lectura de la imagen seleccionada se haya completado.
          reader.onload = function (event) {
            const url = event.target.result;
            if(user instanceof Estudiante){
              const user_modificado = {
                email: user.email,
                name: user.name,
                number: user.number,
                picture: url, // Asigna la URL de la imagen seleccionada al nuevo user
                agrupaciones: user.agrupaciones,
              }
              modificarEstudiante(user_modificado);
              const nuevo_user = new Estudiante(user.name,user.email,user.number,url,user.agrupaciones);
              setUser(nuevo_user);
            }else if(user instanceof Administrador){
              const user_modificado = {
                email: user.email,
                name: user.name,
                number: user.number,
                picture: url, // Asigna la URL de la imagen seleccionada al nuevo user
              }
              modificarAdministrador(user_modificado);
              const nuevo_user = new Administrador(user.name,user.email,user.number,url);
              setUser(nuevo_user);
            }
            
            alert("Tu foto se ha modificado con éxito");
          };
          reader.readAsDataURL(nueva_picture); // Lee la imagen seleccionada como una URL base64
        }
      }
     //cada vez que el auth cambie pasara por aqui
      useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user === null) {
                navigate("/Ingresar");  
            }
          });
      }, []);

    return(
      <div className={styles.div_editar}>
        <div className={styles.div_inputs}>
        <h1 style={{textAlign: "center", marginBottom: "30px"}}>Actualizar informacion</h1>
        <div className={styles.inputs}>
          <input 
            type="text" 
            placeholder="Nuevo Nombre y Apellido"
            className={styles.inputBox}
            onChange={(ev) => setNuevo_nombre(ev.target.value)}
          />
          <button onClick={() => cambiarNombre()} 
          className={styles.button} 
          >Guardar</button>
          <label className={styles.errorLabel}>{nameError}</label>
        </div>
        <br />
        <div className={styles.inputs}>
          <input 
            type="text" 
            placeholder="Nuevo Telefono"
            className={styles.inputBox}
            onChange={(ev) => setNuevo_telefono(ev.target.value)}
          />
          <button 
          onClick={() => cambiarTelefono()}
          className={styles.button}
          >Guardar</button>
          <label className={styles.errorLabel}>{telefonoError}</label>
        </div>
        <br />
        <div className={styles.inputs}>
          <input 
            type="file" 
            accept="image/*"
            className={styles.inputBox}
            onChange={(ev) => setNueva_picture(ev.target.files[0])}
          />
          <button 
          onClick={() => cambiarPicture()}
          className={styles.button}
          >Guardar foto de perfil</button>
          <label className={styles.errorLabel}>{pictureError}</label>
        </div>
        <br />
        </div>
      </div>
    );
}