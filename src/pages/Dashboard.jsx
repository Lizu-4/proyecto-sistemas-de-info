

import { useTipos } from "../hooks/tipos";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { useGrupos } from "../hooks/grupos";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Dashboard.module.css";
import { deleteGrupo, modificarGrupo } from "../controllers/firestore/grupos";
import { deleteTipo } from "../controllers/firestore/tipos";
import cargando from '../img/cargando.gif';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



export default function Dashboard() {

  const [loadingGrupos, setLoadingGrupos] = useState(true);
  const [loadingTipos, setLoadingTipos] = useState(true);
  const [listaTipos, setListaTipos] = useState([]);
  const [listaGrupos, setListaGrupos] = useState([]);

  const agrupaciones = useGrupos();
  const tipos = useTipos();
  const grupos = useGrupos();



      useEffect(() => {
        if (agrupaciones) {
          setLoadingGrupos(false);
          setListaGrupos(grupos)
        }
        
      }, [agrupaciones]);

      useEffect(() => {
        if (tipos) {
          setLoadingTipos(false);
          setListaTipos(tipos);
        }
        
      }, [tipos]);

      function borrarGrupo(idGrupo, agrupacion) {
        console.log(agrupacion.miembros.length);
        if (agrupacion.miembros.length < 1) {
          deleteGrupo(idGrupo);
          setListaGrupos(listaGrupos.filter((grupo) => grupo.id !== idGrupo));
        }else{
         // <Alert severity="error">No puedes eliminar un grupo con miembros.</Alert>
         alert("no puedes eliminar un grupo con miembros")
        }
        
      }
      

      function borrarTipo(idTipo) {
        console.log(idTipo);
        deleteTipo(idTipo);
        setListaTipos(listaTipos.filter((type) => type.id !== idTipo));
      }

    
      if (loadingGrupos) {
        return (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
            <img width="40%" height="20%" src={cargando}/>
          </div>
      );
      }

      if (loadingTipos) {
        return (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
            <img width="40%" height="20%" src={cargando}/>
          </div>
      );
      }
    
      return (
        <div className={styles.div_principal}>  
        {/* style={{ backgroundColor: '#00000', color: 'white', hoverColor: 'white'}}  */}
      
          <div className="contenedor d-flex my-3" style={{ backgroundColor:"#EBEBEB"}}>
            <div className="d-flex flex-column flex-shrink-0 " style={{ width: '4.4rem', height: '100vh', backgroundColor: '#000A62'}}>
              <div className="list-group"   id="list-tab" role="tablist">
                <nav  className={styles.nav}  id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">
                <i class="fa-solid fa-table-cells-large fa-lg" style={{color: "#ffffff"}}></i>
                </nav>
                <nav  className={styles.nav} id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">
                <i class="fa-solid fa-list fa-lg" style={{color: "#ffffff"}}></i>
                </nav>
              </div>
            </div>

            
            <div className="right">
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
               
                <div style={{width: "100%"}}>
                  <h1 >DASHBOARD DE GRUPOS</h1>
                  </div>
               
                  <NavLink key={routes[10].path} to={routes[10].path} 
                  type="button" className="btn btn-success m-3" >
                  Crear Grupo
                  </NavLink>


                <div className="d-flex flex-wrap mx-4">
                {listaGrupos.map((grupo) => (
                  <>
                  <div className="card text-center " style={{ width: '15rem', height: '10rem'}}>
                    <div className="card-header d-flex" style={{color: 'white', backgroundColor: '#000A62', justifyContent: 'space-between'}}>
                       <h5> {grupo.name}</h5>
                    <div>
                      {grupo.disponible}
                     
                    <NavLink  key={`/EditarGrupo/${grupo.id}`}
                    to={`/EditarGrupo/${grupo.id}`}><i className="fa-solid fa-circle-minus" style={{color: "#e07800"}}></i></NavLink>
                      
                      <i className="fa-solid fa-circle-xmark"  onClick={() => borrarGrupo(grupo.id, grupo)} style={{color: "#bd0000", marginLeft: "4px", cursor: "pointer"}}></i>
                    </div> 
                    
                    </div>
                   
                    <div className="card-body" key={grupo.id}>
                      <h5 className="card-title">{grupo.miembros.length}</h5>
                      <p className="card-text">
                        { grupo.miembros.length === 1 ? 'Miembro' : 'Miembros'}
                        </p>
                        <div>
                      </div>
                        
                    </div>
                  </div>
                  </>
                ))}
          
              </div>
                </div>
                <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                <div style={{width: "100%", marginLeft: "1rem"}}>
                  <h1>DASHBOARD DE TIPOS</h1>
                  </div>
                  <NavLink key={routes[12].path} to={routes[12].path} 
                  type="button" className="btn btn-success m-3" >
                  Crear Tipo
                  </NavLink>

                <div className="d-flex flex-wrap p-3">
              {listaTipos.map((type) => (
                <>
                  <div className="card text-center m-3" style={{ width: '15rem', height: '10rem', backgroundColor: '#000A62', color: 'white'}}>
                    <div className="card-header d-flex" style={{color: 'white', justifyContent: 'space-between'}}>
                      <div>
                      <NavLink  key={`/EditarTipo/${type.id}`} to={`/EditarTipo/${type.id}`}>
                        <i className="fa-solid fa-circle-minus" style={{color: "#e07800"}}></i>
                      </NavLink>
                    
                       
                        <i className="fa-solid fa-circle-xmark"  onClick={() => borrarTipo(type.id)} style={{color: "#bd0000", marginLeft: "4px", cursor: "pointer"}}></i>
                      </div>
                    </div>
                    
                      <div className="card-body" key={type.id}>
                        <h3 className="card-title" >{type.nombre}</h3>       
                      </div>
                  </div>
                          
                        </>
                      ))}
                      </div>
                </div>
              </div>
          </div>
        </div>
                      
  </div>
  );


  }styles