import { useTipos } from "../hooks/tipos";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./CrearGrupo.module.css";
import { crearTipo } from "../controllers/firestore/tipos";

export default function CrearTipo() {

    
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(true);


    const tipos = useTipos();

    useEffect(() => {
        if (tipos) {
          setLoading(false);
        }
        
      }, [tipos]);

    if (loading) {
        return <div>Cargando...</div>;
      }

    async function handleSubmit() {
        if (nombre !== "") {
            const nuevoTipo = {
                nombre:nombre,
            }
            crearTipo(nuevoTipo);
            alert("Tipo creado");
        }
    }


    return(
        <div className={styles.div_principal}>
            <div style={{ margin:'2%' }}>
                {/**FORM */}
                <h1 >Crear Tipo</h1>
                <div className={styles.div_inputs}>
                <label htmlFor="nombre">Nombre:</label>
                <input 
                    type="text"
                    id="nomnbre"
                    placeholder="Nombre"
                    className={styles.inputBox}
                    onChange={(ev) => setNombre(ev.target.value)}
                    />
                </div>

                <button type="submit" onClick={handleSubmit}>Subir</button>
                
            </div>
        </div>

    );

}