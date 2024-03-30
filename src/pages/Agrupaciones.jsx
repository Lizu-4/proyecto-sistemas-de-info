//import useGrupos from "../hooks/useGrupos";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGrupos } from "../hooks/grupos";
import { useTipos } from "../hooks/tipos";
import styles from "../pages/Agrupaciones.module.css"



export default function Agrupaciones() {

  const [search, setSearch] = useState('');
  const [searchTipo, setSearchTipo] = useState('');
  const [listaGrupos, setListaGrupos] = useState([]);
  const grupos = useGrupos();
  const tipos = useTipos();

  {console.log(tipos);}

  useEffect(() => {
    setListaGrupos(grupos);
  }, [grupos]);

function Buscador() {
      event.preventDefault();
      const filtro = grupos.filter((grupo) =>

      grupo.name.toLowerCase().includes(search.toLowerCase())
      );
      setListaGrupos(filtro);
}
  
function buscarTipo(tipoNombre) {
  event.preventDefault();
      const filtroTipos = grupos.filter((grupo) =>
      grupo.tipo.toLowerCase().includes(tipoNombre.toLowerCase())
      );
      setListaGrupos(filtroTipos); 
}




  return (
    <div className={styles.container}>
      <div>
        
      </div>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <form class="d-flex align-middle" style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
            <input class="form-control form-control-lg" style={{margin: '5px'}} onChange={e => setSearch(e.target.value)}  type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-light" style={{height: '40px', alignContent: 'center', marginTop: '7px', backgroundColor: '#1C2C54', color: 'white'}} onClick={Buscador}>Search</button>
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" style={{height: '40px', alignContent: 'center', marginTop: '7px', backgroundColor: '#1C2C54', color: 'white'}} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa-solid fa-arrow-down-short-wide"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {tipos?.map ((tipo) => (
              <>
              {console.log(tipo)}
               <li><div class="dropdown-item" onClick={() => {buscarTipo(tipo.nombre)}}>{tipo.nombre}</div></li>
               </>
            ))}
          </ul>
        </div>
          </form>
        </div>
      </nav>

    <div className='container d-flex flex-wrap justify-content-center'>
      {listaGrupos?.map((grupo) => (
          <>
        {grupo.disponible === true 
        ?
        <div className="card  mb-3 text-center p-2 mx-1 my-3" style={{ width: '20rem', height: '20rem'}}>
          <div className="card-header"> <h5 className="card-title" style={{color: 'black', fontWeight: '700', color: '#DD7A31'}}>{grupo.name}</h5></div>
        <div className="card-body">
         
          <img src={grupo.icon} style={{objectFit: 'contain', width:'14rem', height: '12rem'}} />
           
          
          <NavLink  key={`/Grupo/${grupo.id}`}
            to={`/Grupo/${grupo.id}`}
            state={{grupo:grupo}} className="btn btn-dark" style={{ backgroundColor: '#000A62', width:'100%'}}>Detalles</NavLink>
          <br />
        
        </div>
        </div>
            
        :null}

        
          </>
        ))}

    
  </div>
  </div>
  );






  }
  