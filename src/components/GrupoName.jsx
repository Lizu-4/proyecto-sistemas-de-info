
import { Link, NavLink } from "react-router-dom";

import { routes } from '../constants/routes';
import { getGrupoById } from "../controllers/firestore/grupos-services";
import { useEffect, useState, useContext } from 'react';

export default function GrupoName({id}) {


    const [loading, setLoading] = useState(true);
    const [grupo, setGrupo] = useState(null);
  
  
    useEffect(() => {
        async function getClub(id) {
          setLoading(true);
          const grupo = await getGrupoById(id);
          setLoading(false);
          console.log({ grupo });
          setGrupo(grupo);
        }
    
        getClub(id);
      }, [id]);
  
    if (loading) {
      return <div>Cargando...</div>;
    }
 
    return (
      <>
        <h5>{grupo.name}</h5>
      </>
    );
}