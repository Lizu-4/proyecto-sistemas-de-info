import useGrupos from '../hooks/useGrupos';
import { Grupo } from '../objetos/Grupo'; 
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { getGrupoById } from "../controllers/firestore/grupos-services";
import { auth } from '../firebase';
import { useState, useEffect } from 'react';
import { useUser } from "../context/user";
import { useNavigate } from 'react-router-dom';
import cargando from '../img/cargando.gif';
import { modificarEstudiante} from '../controllers/auth';

import styles from './Grupo.module.css';



export default function Agrupacion(){


  // let location = useLocation();
   const { id } = useParams();
   console.log(id);
   
   const [loading, setLoading] = useState(true);
   const [grupo, setGrupo] = useState(null);
   const {user,setUser} = useUser();
 
 
   useEffect(() => {
     async function getGrupo(id) {
       setLoading(true);
       const grupo = await getGrupoById(id);
       setLoading(false);
       setGrupo(grupo);
     }
 
     getGrupo(id);
   }, [id]);

   function handleClick(id){
       const elemento = document.getElementById(id);
       if(user.agrupaciones.includes(id)){
        const agrupacionesActualizadas = user.agrupaciones.filter(agrupaciones => agrupaciones !== id); // Eliminar el ID de membresias
        setUser(prevUser => ({
          ...prevUser,
          agrupaciones: agrupacionesActualizadas
        }));
        // Agregar una clase al elemento
        elemento.classList.remove(styles.desuscribirse);
        elemento.classList.add(styles.suscribirse);
        const estudiante_modificado = {
          name: user.name,
            email: user.email,
            number:user.number,
            picture:user.picture,
            agrupaciones:agrupacionesActualizadas, 
       };
       modificarEstudiante(estudiante_modificado);
       }else{
          const agrupacionesActualizadas = [...user.agrupaciones, id]  //agregar membresia
          setUser(prevUser => ({
            ...prevUser,
            agrupaciones: agrupacionesActualizadas
          }));
          elemento.classList.remove(styles.suscribirse);
          elemento.classList.add(styles.desuscribirse);
          const estudiante_modificado = {
            name: user.name,
            email: user.email,
            number:user.number,
            picture:user.picture,
            agrupaciones:agrupacionesActualizadas, 
         };
         modificarEstudiante(estudiante_modificado);
          
       }
    }
 
   if (loading) {
     return <div>Cargando...</div>;
   }
   return (
       <>

       <div className='container'>
           <div className='up'>
               <div style={{color: "#4BC3B5", fontSize: "65px", marginBottom: "10px"}}> {grupo.name}</div>
               <p>{grupo.mision}</p>
               <p>{grupo.vision}</p>
               <button id={grupo.id} onClick={ () => handleClick(grupo.id)} 
               className={`${user.agrupaciones.includes(grupo.id)? 
               styles.desuscribirse : styles.suscribirse}`}></button>
       
           </div>
           
           
          
           
       </div>

       </>
   );
  }
  styles