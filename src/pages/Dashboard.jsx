
import useTipos from "../hooks/useTipos";
import useGrupos from "../hooks/useGrupos";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Dashboard.module.css";
import { createGrupo, updateGrupo, deleteGrupo, getGrupos } from "../controllers/firestore/grupos-services";
import { getTipos } from "../controllers/firestore/tipos-services"; 



export default function Dashboard() {

  const [agrupaciones, setAgrupaciones] = useState([]);
  const [types, setTiypes] = useState([]);


  
    const {
        tipoStatus, 
        eliminarTipo,
      } = useTipos();

      const {
        grupoStatus, agregarGrupo, modificarBaseDeDatos, eliminarGrupo 
      } = useGrupos();

        useEffect(() => {
          if (grupoStatus.status === "success")
          setAgrupaciones(grupoStatus.data);
        }, [grupoStatus]);

        useEffect(() => {
          if (tipoStatus.status === "success")
          setTiypes(tipoStatus.data);
        }, [tipoStatus]);
        

      function borrarGrupo(id) {
        console.log({id});
        eliminarGrupo(id);
      }

      function borrarTipo(id) {
        console.log({id});
        eliminarTipo(id);
      }
    
          
      if (
        grupoStatus.status === "loading" ) {

          return <div>Cargando...</div>;
      } else if (
        grupoStatus.status === "error" ) {
        return <div>Error al cargar los datos</div>;
      }

      
        if (
            tipoStatus.status === "loading" ) {

          return <div>Cargando...</div>;
      } else if (
        tipoStatus.status === "error" ) {
        return <div>Error al cargar los datos</div>;
      }
    
      return (
        <div className='container'>  
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
                {agrupaciones.map((grupo) => (
                  <>
                  <div className="card text-center " style={{ width: '15rem', height: '10rem'}}>
                    <div className="card-header d-flex" style={{color: 'white', backgroundColor: '#000A62', justifyContent: 'space-between'}}>
                       <h5> {grupo.name}</h5>
                    <div>
                     
                    <NavLink  key={`/EditarGrupo/${grupo.id}`}
                    to={`/EditarGrupo/${grupo.id}`}><i className="fa-solid fa-circle-minus" style={{color: "#e07800"}}></i></NavLink>
                      
                      <i className="fa-solid fa-circle-xmark"  onClick={() => borrarGrupo(grupo.id)} style={{color: "#bd0000", marginLeft: "4px"}}></i>
                    </div> 
                    
                    </div>
                   
                    <div className="card-body" key={grupo.id}>
                      <h5 className="card-title">{grupo.miembros.length}</h5>
                      <p className="card-text">
                        { grupo.miembros.length === 1 ? 'Miembro' : 'Miembros'}
                        </p>
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
                  <NavLink key={routes[11].path} to={routes[11].path} 
                  type="button" className="btn btn-success m-3" >
                  Crear Grupo
                  </NavLink>

                <div className="d-flex flex-wrap p-3">
              {types.map((type) => (
                <>
                  <div className="card text-center m-3" style={{ width: '15rem', height: '10rem', backgroundColor: '#000A62', color: 'white'}}>
                    <div className="card-header d-flex" style={{color: 'white', justifyContent: 'space-between'}}>
                      <div>
                      <NavLink  key={`/EditarTipo/${type.id}`} to={`/EditarTipo/${type.id}`}>
                        <i className="fa-solid fa-circle-minus" style={{color: "#e07800"}}></i>
                      </NavLink>
                    
                       
                        <i className="fa-solid fa-circle-xmark"  onClick={() => borrarTipo(type.id)} style={{color: "#bd0000", marginLeft: "4px"}}></i>
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