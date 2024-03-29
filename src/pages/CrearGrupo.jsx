import {useTipos} from "../hooks/tipos";
import {useGrupos} from "../hooks/grupos";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./CrearGrupo.module.css";
import { crearGrupo} from '../controllers/firestore/grupos';

export default function CrearGrupo() {

    
    const [loadingGrupos, setLoadingGrupos] = useState(true);
    const [loadingTipos, setLoadingTipos] = useState(true);
    const [name, setName] = useState("");
    const [mision, setMision] = useState("");
    const [vision, setVision] = useState("");
    const [icon, setIcon] = useState("");
    const [tipo, setTipo] = useState("");
    const [disponible, setDisponible] = useState(true);

    const tipos = useTipos();

    const grupos = useGrupos();

    
    useEffect(() => {
        if (grupos) {
          setLoadingGrupos(false);
        }
        
      }, [grupos]);

      useEffect(() => {
        if (tipos) {
          setLoadingTipos(false);
        }
        
      }, [tipos]);

      if (loadingGrupos) {
        return <div>Cargando...</div>;
      }

      if (loadingTipos) {
        return <div>Cargando...</div>;
      }


    async function handleSubmit() {
        if (icon !== "" ) {
            const reader = new FileReader();
            reader.onload = async function (event) {
                const url = event.target.result;
                console.log(url)
                setIcon(url);
                const grupo_modificado = {
                icon: url,
                miembros: [],
                mision:mision,
                name:name,
                tipo: tipo,
                vision:vision,
                comentarios:[],
                disponible:disponible
                }
               // crearGrupo(grupo_modificado);
               console.log(grupo_modificado);
                alert("grupo creado");
                setName("");
                setMision("");
                setVision("");
                setIcon("");
                setTipo("");
            };
            reader.readAsDataURL(icon);
        }
    }


    return(
        
        <div className={styles.div_principal}>
        <div style={{ margin:'2%' }}>
            {/**FORM */}
            <h1 >Crear grupo</h1>
            <div className={styles.div_inputs}>
            <label htmlFor="nombre">Nombre:</label>
            <input 
                type="text"
                id="nomnbre"
                placeholder="Nombre"
                className={styles.inputBox}
                onChange={(ev) => setName(ev.target.value)}
                />

            <label>
                    ¿Disponible?
                    <br />
                    <input
                    type="radio"
                    name="agree"
                    value={true}
                    onChange={(event) => setDisponible(true)}
                    
                    />
                    Sí
                </label>
                <label>
                    <input
                    type="radio"
                    name="agree"
                    value={false}
                    onChange={(event) => setDisponible(false)}
                    />
                    No
                </label>
                        
            

                <label htmlFor="Tipos">Tipos:</label>
                <select className={styles.inputBox} name="Tipos" id="Tipos" onChange={(ev) => setTipo(ev.target.value)}>
                {tipos.map((type) => (
                        <option  value={type.nombre}>{type.nombre}</option>
                        ))}
                </select>
                
                <label htmlFor="mision">Mision:</label>
                <input 
                id="mision"
                type="text" 
                placeholder="Mision"
                className={styles.inputBox}
                onChange={(ev) => setMision(ev.target.value)}
                />
                

               
                <label htmlFor="vision">Vision:</label>
                <input 
                type="text" 
                id="vision"
                placeholder="Vision"
                className={styles.inputBox}
                onChange={(ev) => setVision(ev.target.value)}
                />
                <br />

                <label htmlFor="icon">Icon del grupo:</label>
                <input type="file" 
                name="icon" 
                id="icon" 
                onChange={(ev) => setIcon(ev.target.files[0])}/>
                <br />

                <button type="submit" onClick={handleSubmit}>Subir</button>

            </div>
        </div>
    </div>

    );

}