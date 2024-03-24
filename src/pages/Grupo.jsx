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
import { Estudiante } from '../objetos/Estudiante';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
        //Modificar usuario
        const nuevo_user = new Estudiante(user.name,user.email,user.number,user.picture,agrupacionesActualizadas);
        setUser(nuevo_user);
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
          //Modificar usuario
          const nuevo_user = new Estudiante(user.name,user.email,user.number,user.picture,agrupacionesActualizadas);
          setUser(nuevo_user);
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
           <div>
            <input 
              id='price'
              type="number" 
              placeholder="Monto a donar"
            />
           </div>
           <div>
            <PayPalScriptProvider options={{ 
              clientId: "AUc8t3lkrJTMH1tmBK83aY3fONNsSGc5arquBmfjKSt4CnIyT6JwSNUxnBF7naEDmefiNExEmJGNmpIA"
            }}>
              <PayPalButtons 
              style={{ layout: "horizontal" }} 
              createOrder= {(data,actions)=>{
                return actions.order.create({
                  purchase_units:[
                    {
                      amount: {
                        value: (!isNaN(document.getElementById('price').value) && document.getElementById('price').value !== '' && document.getElementById('price').value >= 0) ? document.getElementById('price').value : (alert("Debes colocar un monto válido\nNo coloques letras\nNo coloques numeros negativos"), null)
                      }
                    }
                  ]
                })
              }}
              onCancel= {()=>{}}
              onApprove= {(data,actions)=>{
                return actions.order.capture(alert("El pago ha sido Exitoso"));
              }}
              />
            </PayPalScriptProvider>
           </div>
           
          
           
       </div>

       </>
   );
  }
  styles