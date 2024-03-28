//import useGrupos from "../hooks/useGrupos";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGrupos } from "../hooks/grupos";



export default function Agrupaciones() {

  const grupos = useGrupos();

//  const grupos = grupoStatus.data;
  




  return (
    <div className='container'>
    <div className='container d-flex flex-wrap justify-content-center'>
      {grupos?.map((grupo) => (
          <>

        <div className="card text-center p-2 mx-1 my-3" style={{ width: '20rem'}}>
        <div className="card-body">
          <h5 className="card-title" style={{color: '#bf54a1', fontWeight: '600'}}>{grupo.name}</h5>
          <img src={grupo.icon} />
           {/* <p className="card-text">{grupo.descripcion}</p>  */}
          
          <NavLink  key={`/Grupo/${grupo.id}`}
            to={`/Grupo/${grupo.id}`}
            state={{grupo:grupo}} className="btn btn-dark" style={{ backgroundColor: '#1C2C54' }}>Detalles</NavLink>
          <br />
        
        </div>
        </div>
            
          </>
        ))}

    
  </div>
  </div>
  );






  }
  