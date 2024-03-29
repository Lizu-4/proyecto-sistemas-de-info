import { useTipos } from "../hooks/tipos";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./CrearGrupo.module.css";
import { crearTipo } from "../controllers/firestore/tipos";
import TextField from '@mui/material/TextField';
import cargando from '../img/cargando.gif';

export default function CrearTipo() {

    
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(true);
    const [nameError, setNameError] = useState("");
    const navigate = useNavigate();

    const tipos = useTipos();

    useEffect(() => {
        if (tipos) {
          setLoading(false);
        }
        
      }, [tipos]);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
              <img width="40%" height="20%" src={cargando}/>
            </div>
          );
      }

    async function handleSubmit() {
        setNameError("");
        if(nombre === ""){
            setNameError("Por favor coloca un Nombre");
            return;
        }
        if (nombre !== "") {
            const nuevoTipo = {
                nombre:nombre,
            }
            crearTipo(nuevoTipo);
            alert("Tipo creado");
            navigate("/Dashboard");
        }
    }


    return(
        <div className={styles.div_principal}>
            <div style={{ margin:'2%' }}>
                {/**FORM */}
                <h1 >Crear Tipo</h1>
                <div className={styles.div_inputs}>
                <TextField
                    className={styles.inputBox}
                    id="nomnbre"
                    label="Nombre"
                    multiline
                    onChange={(ev) => setNombre(ev.target.value)}
                  />
                <label style={{color:"red",fontSize:"12px"}}>{nameError}</label>
                </div>

                <button type="submit" onClick={handleSubmit}>Subir</button>
                
            </div>
        </div>

    );

}