
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
        <h5>{grupo.name}</h5>
      </>
    );
}