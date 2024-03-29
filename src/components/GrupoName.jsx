
import { Link, NavLink } from "react-router-dom";

import { routes } from '../constants/routes';
import { useGrupos, useGrupo } from "../hooks/grupos";
import { useEffect, useState, useContext } from 'react';

export default function GrupoName({id}) {


    const [loading, setLoading] = useState(true);

    const grupo = useGrupo(id);
  
  
    useEffect(() => {
      if (grupo) {
        setLoading(false);
      }
      
    }, [grupo]);

  
    if (loading) {
      return <div>Cargando...</div>;
    }
 
    return (
      <>
        <h5>{grupo.name}</h5>
      </>
    );
}