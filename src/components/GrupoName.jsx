
import { Link, NavLink } from "react-router-dom";

import { routes } from '../constants/routes';
import { useGrupos, useGrupo } from "../hooks/grupos";
import { useEffect, useState, useContext } from 'react';
import cargando from '../img/cargando.gif';

export default function GrupoName({id}) {


    const [loading, setLoading] = useState(true);

    const grupo = useGrupo(id);
  
  
    useEffect(() => {
      if (grupo) {
        setLoading(false);
      }
      
    }, [grupo]);

  
    if (loading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
          <img width="40%" height="20%" src={cargando}/>
        </div>
      );
    }
 
    return (
      <>

        <div className="card  mb-3 text-center p-2" style={{ width: '15rem', height: '15rem', margin: '10px'}}>
          <div className="card-header"> <h5 className="card-title" style={{color: 'black', fontWeight: '700', color: '#DD7A31'}}>{grupo.name}</h5></div>
            <div className="card-body">
            
              <img src={grupo.icon} style={{objectFit: 'scale-down', width:'12rem', height: '11rem'}} />    
          </div>
        </div>
          
      </>
    );
}