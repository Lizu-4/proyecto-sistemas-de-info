import useGrupos from '../hooks/useGrupos';
import { Grupo } from '../objetos/Grupo'; 
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { useGrupo } from "../hooks/grupos";
import { auth } from '../firebase';
import { useState, useEffect } from 'react';
import { useUser } from "../context/user";
import { useNavigate } from 'react-router-dom';
import cargando from '../img/cargando.gif';
import { modificarGrupo} from '../controllers/firestore/grupos';
import { modificarEstudiante } from '../controllers/auth'
import { Estudiante } from '../objetos/Estudiante';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import styles from './Grupo.module.css';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';



export default function Agrupacion(){


  // let location = useLocation();
   const { id } = useParams();
   console.log(id);
   
  const [loading, setLoading] = useState(true);
  //const [grupo, setGrupo] = useState(null);
   const {user,setUser} = useUser();
   const [feedback,setFeedback] = useState();

   const grupo = useGrupo(id);
 
   useEffect(() => {
    if (grupo) {
      setLoading(false);
    }
    
  }, [grupo]);
 

   function handleClick2(id){
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
        let miembrosActualizados = [];
        for (let i = 0; i < grupo.miembros.length; i++) {
          if(user.email !== grupo.miembros[i].email){
            miembrosActualizados.push(grupo.miembros[i]);
          }
        }
        console.log(miembrosActualizados)
        const nuevo_grupo = new Grupo(grupo.id,grupo.name,grupo.tipo,grupo.mision,grupo.vision,miembrosActualizados, grupo.icon,grupo.comentarios,grupo.disponible);
        setGrupo(nuevo_grupo);
        const grupo_modificado = {
          name:grupo.name,
          tipo: grupo.tipo,
          mision:grupo.mision,
          vision:grupo.vision,
          miembros: miembrosActualizados,
          icon: grupo.icon,
          comentarios: grupo.comentarios,
          disponible: grupo.disponible
        }
        modificarGrupo(grupo.id,grupo_modificado);
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
         const miembrosActualizados = [...grupo.miembros, estudiante_modificado];
         const nuevo_grupo = new Grupo(grupo.id,grupo.name,grupo.tipo,grupo.mision,grupo.vision,miembrosActualizados, grupo.icon,grupo.comentarios,grupo.disponible);
         setGrupo(nuevo_grupo);
         const grupo_modificado = {
            name:grupo.name,
            tipo: grupo.tipo,
            mision:grupo.mision,
            vision:grupo.vision,
            miembros: miembrosActualizados,
            icon: grupo.icon,
            comentarios: grupo.comentarios,
            disponible: grupo.disponible
          }
          modificarGrupo(grupo.id,grupo_modificado);
       }
    }
   if (loading) {
     return <div>Cargando...</div>;
   }

   function getRandomColor() {
    // Generar valores aleatorios para los componentes RGB
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
  
    // Crear el color en formato hexadecimal
    const color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  
    return color;
  }
  function agregarFeedback(){
    if(feedback === ""){
      alert("Debes colocar algun comentario");
    }else if(user.agrupaciones.includes(grupo.id) === false){
      alert("Solo los miembros pueden agregar un feedback");
    }else{
      const nuevo_comentario = {
        name: user.name,
        comentario: feedback
      }
      const comentariosActualizados = [...grupo.comentarios, nuevo_comentario];
      const nuevo_grupo = new Grupo(grupo.id,grupo.name,grupo.tipo,grupo.mision,grupo.vision,grupo.miembros, grupo.icon,comentariosActualizados,grupo.disponible);
      setGrupo(nuevo_grupo);
      const grupo_modificado = {
            name:grupo.name,
            tipo: grupo.tipo,
            mision:grupo.mision,
            vision:grupo.vision,
            miembros: grupo.miembros,
            icon: grupo.icon,
            comentarios: comentariosActualizados,
            disponible: grupo.disponible
      }
      modificarGrupo(grupo.id,grupo_modificado);
      setFeedback("");
      document.getElementById("input_agregar_feedback").value = "";
      alert("Tu feedback se ha guardado con exito")
    }
  }
   return (
       <>

       <div className='container'>
           <div className={styles.up}>
            
               <div style={{width:"50%"}}>
                  <img src={grupo.icon} style={{ width: "100%", height:"100%", objectFit: 'fill'}}/> 
               </div>
               <div style={{ fontSize: "65px",fontWeight: "bolder", marginLeft: "auto", marginRight: "auto"}}> 
                  <p style={{textAlign: "center"}}>{grupo.name}</p>
                  <Divider style={{ borderBottom: '2px solid #000A62' }} orientation="horizontal" />
                  {user instanceof Estudiante ? 
                  <button 
                  id={grupo.id} 
                  onClick={ () => handleClick2(grupo.id)} 
                  className={`${user.agrupaciones.includes(grupo.id)? styles.desuscribirse : styles.suscribirse}`}>
                  </button>
                  : null}
               </div>
       
           </div>
           {/* MISION Y VISION */}
           <div>
              <Accordion style={{marginBottom:"1%",color:"white"}}>
                <AccordionSummary style={{backgroundColor:"#000A62"}} expandIcon={<ExpandMoreIcon style={{ color: 'white' }}/>}>
                  <Typography>Mision</Typography>
                </AccordionSummary>
                <AccordionDetails style={{color:"black"}}>
                  <Typography>
                    {grupo.mision}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion style={{color:"white"}}>
                <AccordionSummary style={{backgroundColor:"#000A62"}} expandIcon={<ExpandMoreIcon style={{ color: 'white' }}/>}>
                  <Typography>Vision</Typography>
                </AccordionSummary>
                <AccordionDetails style={{color:"black"}}>
                  <Typography>
                    {grupo.vision}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion style={{color:"white", marginTop:"1%"}}>
                <AccordionSummary style={{backgroundColor:"#000A62"}} expandIcon={<ExpandMoreIcon style={{ color: 'white' }}/>}>
                  <Typography>Feedbacks</Typography>
                </AccordionSummary>
                <AccordionDetails style={{color:"black"}}>
                  <Typography>
                  {grupo.comentarios !== null?(
                  <List
                      sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        '& ul': { padding: 0 },
                      }}
                      subheader={<li />}
                    >
                      {grupo.comentarios.map((miembro) => (
                        <li key={miembro.comentario}>
                          <ul>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar style={{ backgroundColor: getRandomColor() }}>{miembro.name.charAt(0).toUpperCase()}</Avatar>
                            </ListItemAvatar>
                            <ListItemText style={{color:"black"}}
                              primary={miembro.name}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline'}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {miembro.comentario}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          <Divider variant="inset" component="li" />
                          </ListItem>
                          </ul>
                        </li>
                      ))}
                    </List>):"Aun no hay feedbacks"}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              
           </div>
           {/* CARRUSEL */}
           <div></div>
           <div className={styles.miembros_y_feedback}>
           <div className={styles.miembros}>
            <h3 style={{ fontWeight: "bolder"}}>Miembros</h3>
            <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 300,
                  '& ul': { padding: 0 },
                }}
                subheader={<li />}
              >
                {grupo.miembros.map((miembro) => (
                  <li key={miembro.email}>
                    <ul>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: getRandomColor() }}>{miembro.name.charAt(0).toUpperCase()}</Avatar>
                      </ListItemAvatar>
                      <ListItemText style={{color:"black"}}
                        primary={miembro.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline'}}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {miembro.email}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    <Divider variant="inset" component="li" />
                    </ListItem>
                    </ul>
                  </li>
                ))}
              </List>
              </div>
              <div className={styles.feedback}>
              <h3 style={{ fontWeight: "bolder"}}>Feedback</h3>
              
              <TextField
                className={styles.inputBox}
                id="input_agregar_feedback"
                label="Feedback"
                multiline
                rows={6}
                variant="filled"
                onChange={(ev) => setFeedback(ev.target.value)}
              />
              <button className={styles.button} onClick={() => agregarFeedback()}>Agregar Feedback</button>
              </div>
            </div>
           {/* PAYPAL */}
           <div className={styles.paypal}>
            <div style={{marginLeft:"1%"}}>
              <h1>Contribucion Al Grupo</h1>
              <Divider style={{ borderBottom: '2px solid #000A62' }} orientation="horizontal" />
              <br />
              <p>Puedes colaborar con tu agrupación aportando un monto de tu selección</p>
            </div>
           <div className={styles.contribucion_derecha}>
           <input 
              style={{color:"black"}}
              className={styles.inputBox}
              id='price'
              type="number" 
              placeholder="Monto a donar"
            />
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
           
          
           
       </div>

       </>
   );
  }
  styles