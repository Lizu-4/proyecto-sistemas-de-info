import useTipos from "../hooks/useTipos";
import useGrupos from "../hooks/useGrupos";
import { Link, NavLink, useParams } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState, useContext } from 'react';

import { getGrupoById } from "../controllers/firestore/grupos-services";
import { useNavigate } from 'react-router-dom';
import styles from "./CrearGrupo.module.css";
import { createGrupo, updateGrupo, deleteGrupo } from "../controllers/firestore/grupos-services";

export default function EditarGrupo() {

    const [grupo, setGrupo] = useState(null);
    const [name, setName] = useState("");
    const [mision, setMision] = useState("");
    const [vision, setVision] = useState("");
    const [icon, setIcon] = useState("");
    const [tipo, setTipo] = useState("");
    const [pictures, setPictures] = useState([]);
    const [fotos, setFotos] = useState([]);
    const [loading, setLoading] = useState(true);


    const { id } = useParams();

    useEffect(() => {
        async function getGrupo(id) {
         //   setLoading(true);
            const grupo = await getGrupoById(id);
          //  setLoading(false);
            setGrupo(grupo);
            setName(grupo.name);
            setVision(grupo.vision);
            setMision(grupo.mision);
            setTipo(grupo.tipo);
            setIcon(grupo.icon);


            }
            
            getGrupo(id);

        }, [id]);


    const {
        tipoStatus,
    } = useTipos();

    const navigate = useNavigate();

    const {
        grupoStatus, agregarGrupo, modificarBaseDeDatos,
    } = useGrupos();

    const tipos = tipoStatus.data;

    
    const grupos = grupoStatus.data;

    
    if (grupoStatus.status === "loading") {
        return <div>Cargando...</div>;
      }

      if (tipoStatus.status === "loading") {
        return <div>Cargando...</div>;
      }


     function handleSubmit() {
   // handleIcon(icon);
  //  handlePictures(fotos);
    console.log({name, tipo, mision, vision, pictures, icon});
    const grupoActualizado = {
        name: name,
        tipo: tipo,
        mision: mision,
        vision: vision,
        pictures: pictures,
        icon: icon
    }
    updateGrupo(grupo.id, grupoActualizado);
    alert("grupo actualizado");
   
    }


    return(
        
        <div className={styles.div_principal}>
        <div style={{ margin:'2%' }}>
            {/**FORM */}
            <h1 >Editar grupo</h1>
            <div className={styles.div_inputs}>
            <label htmlFor="nombre">Nombre:</label>
            <input 
                defaultValue={grupo.name}
                type="text"
                id="nomnbre"
                placeholder="Nombre"
                className={styles.inputBox}
                onChange={(ev) => setName(ev.target.value)}
                />
               
            

                <label htmlFor="Tipos">Tipos:</label>
                <select defaultValue={grupo.tipo} className={styles.inputBox} name="Tipos" id="Tipos" onChange={(ev) => setTipo(ev.target.value)}>
                {tipos.map((type) => (
                        <option  value={type.nombre}>{type.nombre}</option>
                        ))}
                </select>
                
                <label htmlFor="mision">Mision:</label>
                <input 
                defaultValue={grupo.mision}
                id="mision"
                type="text" 
                placeholder="Mision"
                className={styles.inputBox}
                onChange={(ev) => setMision(ev.target.value)}
                />
                

               
                <label htmlFor="vision">Vision:</label>
                <input 
                defaultValue={grupo.vision}
                type="text" 
                id="vision"
                placeholder="Vision"
                className={styles.inputBox}
                onChange={(ev) => setVision(ev.target.value)}
                />
                <br />

                {/* <label htmlFor="icon">Icon del grupo:</label>
                <input type="file" 
                name="icon" 
                id="icon" 
                onChange={(ev) => setIcon(ev.target.files[0])}/>
                <br /> */}
                
                <label htmlFor="pictures">Fotos:</label>
                <input type="file"
                multiple
                name="pictures"
                id="pictures"
                onChange={(ev) => setPictures(ev.target.files)}/>

                <button type="submit" onClick={handleSubmit}>Subir</button>

            </div>
        </div>
    </div>

    );

}