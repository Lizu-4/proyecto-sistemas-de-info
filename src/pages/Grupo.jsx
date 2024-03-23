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


export default function Agrupacion(){


  // let location = useLocation();
   const { id } = useParams();
  console.log('gola');
   console.log(id);
   
   const [loading, setLoading] = useState(true);
   const [grupo, setGrupo] = useState(null);
   const {user,setUser} = useUser();
 
 
   useEffect(() => {
     async function getGrupo(id) {
       setLoading(true);
       const grupo = await getGrupoById(id);
       setLoading(false);
       console.log({ grupo });
       setGrupo(grupo);
     }
 
     getGrupo(id);
   }, [id]);

  //  function handleClick(id){
  //      const elemento = document.getElementById(id);
  //      if(user.membresias.includes(id)){
  //       const membresiasActualizadas = user.membresias.filter(membresia => membresia !== id); // Eliminar el ID de membresias
  //       setUser(prevUser => ({
  //         ...prevUser,
  //         membresias: membresiasActualizadas
  //       }));
  //       // Agregar una clase al elemento
  //       elemento.classList.remove(styles.desuscribirse);
  //       elemento.classList.add(styles.suscribirse);
  //       const usuario_modificado = {
  //        nombre: user.nombre,
  //        apellido: user.apellido,
  //        username: user.username,
  //        email: user.email,
  //        videojuego_preferido: user.videojuego_preferido,
  //        membresias:membresiasActualizadas, 
  //      };
  //      modificarUsuario(usuario_modificado);
  //      }else{
  //         const membresiasActualizadas = [...user.membresias, id]  //agregar membresia
  //         setUser(prevUser => ({
  //           ...prevUser,
  //           membresias: membresiasActualizadas
  //         }));
  //         elemento.classList.remove(styles.suscribirse);
  //         elemento.classList.add(styles.desuscribirse);
  //         const usuario_modificado = {
  //          nombre: user.nombre,
  //          apellido: user.apellido,
  //          username: user.username,
  //          email: user.email,
  //          videojuego_preferido: user.videojuego_preferido,
  //          membresias:membresiasActualizadas, 
  //        };
  //        modificarUsuario(usuario_modificado);
          
  //      }
  //   }
 
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
{/* 
               <button id={grupo.id} onClick={ () => handleClick(grupo.id)}  
              //  className={`${user.membresias.includes(club.id)? styles.desuscribirse : styles.suscribirse}`}
               ></button> */}

           </div>
           
           
          
           
       </div>

       </>
   );
  }
  