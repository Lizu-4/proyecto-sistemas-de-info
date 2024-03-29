
import { Link, NavLink, useParams } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState, useContext } from 'react';
import {useTipo, useTipos} from "../hooks/tipos";
import {useGrupos, useGrupo} from "../hooks/grupos";
import { useNavigate } from 'react-router-dom';
import styles from "./CrearGrupo.module.css";
import { modificarGrupo } from "../controllers/firestore/grupos";

export default function EditarGrupo() {

    const [loadingGrupos, setLoadingGrupos] = useState(true);
    const [loadingTipos, setLoadingTipos] = useState(true);
    const [name, setName] = useState("");
    const [mision, setMision] = useState("");
    const [vision, setVision] = useState("");
    const [icon, setIcon] = useState("");
    const [tipo, setTipo] = useState("");
    const [disponible, setDisponible] = useState(true);

    const tipos = useTipos();


    const { id } = useParams();
    const grupo = useGrupo(id);


        
    useEffect(() => {
        if (grupo) {
          setLoadingGrupos(false);
            setName(grupo.name);
            setVision(grupo.vision);
            setMision(grupo.mision);
            setTipo(grupo.tipo);
            setIcon(grupo.icon);

        }
        
      }, [grupo]);

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




     function handleSubmit() {

        if (icon !== "" && tipo !== "" ) {
            const reader = new FileReader();
            reader.onload = async function (event) {
                const url = event.target.result;
                const grupo_modificado = {
                icon: url,
                miembros: grupo.miembros,
                mision:mision,
                name:name,
                tipo: tipo,
                vision:vision,
                comentarios:grupo.comentarios,
                disponible:disponible,
                }
                modificarGrupo(id, grupo_modificado);
                alert("grupo modificado");
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
            <h1 >Editar grupo</h1>
            <div className={styles.div_inputs}>
            <label htmlFor="nombre">Nombre:</label>
            <input 
                defaultValue={grupo.name}
                type="text"
                id="nombre"
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
                    onChange={() => setDisponible(true)}
                    
                    />
                    Sí
                </label>
                <label>
                    <input
                    type="radio"
                    name="agree"
                    value={false}
                    onChange={() => setDisponible(false)}
                    />
                    No
                </label>
               
            

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