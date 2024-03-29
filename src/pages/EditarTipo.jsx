import { useTipo } from "../hooks/tipos";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./CrearGrupo.module.css";
import { modificarTipo } from "../controllers/firestore/tipos";
import { useParams } from "react-router-dom";

export default function EditarTipo() {

    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState("");
    //const [tipo, setTipo] = useState(null);

    const { id } = useParams();
    const tipo = useTipo(id);

    useEffect(() => {
        if (tipo) {
          setLoading(false);
        }
        
      }, [tipo]);

      if (loading) {
        return <div>Cargando...</div>;
      }

    async function handleSubmit() {

    console.log({nombre});

    const tipoActualizado = {
        nombre: nombre,
    }
    modificarTipo(id, tipoActualizado);
    alert("Tipo actualizado");
    }


    return(
        <div className={styles.div_principal}>
            <div style={{ margin:'2%' }}>
                {/**FORM */}
                <h1 >Editar Tipo</h1>
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