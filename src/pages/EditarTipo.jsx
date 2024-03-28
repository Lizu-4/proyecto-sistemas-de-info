import useTipos from "../hooks/useTipos";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState, useContext } from 'react';
import { getTipoById } from "../controllers/firestore/tipos-services";
import { useNavigate } from 'react-router-dom';
import styles from "./CrearGrupo.module.css";
import { createTipo, updateTipo } from "../controllers/firestore/tipos-services";

export default function EditarTipo() {

    
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        async function get(id) {
         //   setLoading(true);
            const grupo = await getTipoById(id);
          //  setLoading(false);
            setNombre(tipo.nombre)


            }
            
            getGrupo(id);

        }, [id]);

    const {
        tipoStatus, agregarTipo, modificarBaseDeDatos

    } = useTipos();

    const tipos = tipoStatus.data;

    if (
        tipoStatus.status === "loading" ) {

        return <div>Cargando...</div>;
    } else if (
        tipoStatus.status === "error" ) {
        return <div>Error al cargar los datos</div>;
    }

    async function handleSubmit() {

    console.log({nombre});

    const tipoActualizado = {
        nombre: nombre,
    }
    updateTipo(id, tipoActualizado);
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