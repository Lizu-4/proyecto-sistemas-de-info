
import useTipos from "../hooks/useTipos";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';




export default function Dashboard() {
  
    const {
        tipoStatus,
      } = useTipos();
    
      const tipos = tipoStatus.data;
      
    
    
        if (
            tipoStatus.status === "loading" ) {

          return <div>Cargando...</div>;
      } else if (
        tipoStatus.status === "error" ) {
        return <div>Error al cargar los datos</div>;
      }
    
      return (
        <div className='container'>
        <div className='container d-flex flex-wrap justify-content-center'>
          {tipos.map((tipos) => (
              <>
    
            <div className="card text-center p-2 mx-1 my-3" style={{ width: '20rem'}}>
            <div className="card-body">
              <h5 className="card-title" style={{color: '#bf54a1', fontWeight: '600'}}>{tipos.nombre}</h5>
            </div>
            </div>
                
              </>
            ))}
    

    
    </div>
  </div>
  );


  }