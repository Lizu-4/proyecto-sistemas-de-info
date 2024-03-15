import { modificarEstudiante} from '../controllers/auth';
import { useUser } from '../context/user';
import styles from './Perfil.module.css';
import img_user from '../img/cat.png'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

import { onAuthStateChanged } from 'firebase/auth';
import { Estudiante } from '../objetos/Estudiante';
export default function Perfil() {
  const {user,setUser} = useUser();
  //const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const [nuevo_nombre,setNuevo_nombre] = useState("");
  const [nuevo_telefono,setNuevo_telefono] = useState("");
  const [nueva_picture,setNueva_picture] = useState("");
  const [nuevo_email,setNuevo_email] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [pictureError, setPictureError] = useState("");
  const navigate = useNavigate();
  

  function cambiarNombre(){
    setNameError("");
    if(nuevo_nombre === ""){
      setNameError("Por favor coloca tu nuevo nombre");
      return;
    }else{
      const user_modificado = {
        email: user.email,
        name: nuevo_nombre,
        number:user.number,
        picture:user.picture,
        agrupaciones:user.agrupaciones,    
      }
      modificarEstudiante(user_modificado);
      const nuevo_user = new Estudiante(user.name,user.email,user.number,user.picture,user.agrupaciones);
      setUser(nuevo_user);
      alert("Tu nombre se ha modificado con exito");
    }
  }

  function cambiarTelefono(){
    setTelefonoError("");
    if(nuevo_telefono === ""){
      setTelefonoError("Por favor coloca tu nuevo telefono");
      return;
    }else{
      const user_modificado = {
        email: user.email,
        name: user.name,
        number: nuevo_telefono,
        picture:user.picture,
        agrupaciones:user.agrupaciones,    
      }
      modificarEstudiante(user_modificado);
      const nuevo_user = new Estudiante(user.name,user.email,user.number,user.picture,user.agrupaciones);
      setUser(nuevo_user);
      alert("Tu telefono se ha modificado con exito");
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
        alert("Tu foto se ha modificado con éxito");
      };
      reader.readAsDataURL(nueva_picture); // Lee la imagen seleccionada como una URL base64
    }
  }

  // function cambiarEmail(){
  //   actualizarEmail(nuevo_email);
  // }

  return (
    <div className={styles.div_principal}>
      <header>
        {/**ENCABEZADO */}
        <div className={styles.titleContainer}>
                Perfil
          <img style={{ marginLeft: "10%", objectFit: "contain"}} width="170px" height="170px" src={img_user} ></img>
          <img style={{ marginLeft: "10%", objectFit: "contain"}} width="170px" height="170px" src={user.picture} ></img>
          <p style={{ fontSize: "20px", color: "#D175B7"}}>{user.email}</p>
          <p style={{color: "#4BC3B5"}}> {user.nombre} {user.apellido}</p>
        </div>
        <p style={{ fontSize: "25px" }}>Informacion actual: </p>
        <p>Nombre: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Telefono: {user.number}</p>
        <p style={{ fontSize: "25px", color: "#D175B7"}}>Miembro de: </p> 

      </header>
      <div className={styles.div_inputs}>
        <p>Actualizar informacion:</p>
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
        {/* <div className={styles.inputs}>
          <input 
            type="text" 
            placeholder="Nuevo Email"
            className={styles.inputBox}
            onChange={(ev) => setNuevo_email(ev.target.value)}
          />
          <button
          className={styles.button}
          >Guardar</button>
          <label className={styles.errorLabel}>{emailError}</label>
        </div> */}
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
