import useTipos from "../hooks/useTipos";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./CrearGrupo.module.css";
import { createTipo } from "../controllers/firestore/tipos-services";
export default function CrearGrupo() {

    
    const [nombre, setNombre] = useState("");

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

    await createTipo(nombre);
        if (agregarTipo){
            agregarTipo(nombre);

        }if (modificarBaseDeDatos){
        modificarBaseDeDatos(nombre);
        }
        alert("Tipo creado");
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