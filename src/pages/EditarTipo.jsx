import { useTipo } from "../hooks/tipos";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./CrearGrupo.module.css";
import { modificarTipo } from "../controllers/firestore/tipos";
import { useParams } from "react-router-dom";
import cargando from '../img/cargando.gif';
import TextField from '@mui/material/TextField';

export default function EditarTipo() {

    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState("");
    const [nameError, setNameError] = useState("");
    //const [tipo, setTipo] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams();
    const tipo = useTipo(id);

    useEffect(() => {
        if (tipo) {
          setLoading(false);
        }
        
      }, [tipo]);

      if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
              <img width="40%" height="20%" src={cargando}/>
            </div>
        );
      }

    async function handleSubmit() {

    console.log({nombre});
    setNameError("");
    if(nombre === ""){
            setNameError("Por favor coloca un Nombre");
            return;
    }
    const tipoActualizado = {
        nombre: nombre,
    }
    modificarTipo(id, tipoActualizado);
    alert("Tipo actualizado");
    navigate("/Dashboard");
    }


    return(
        <div className={styles.div_principal}>
            <div style={{ margin:'2%' }}>
                {/**FORM */}
                <h1 style={{textAlign: "center", fontWeight: "bolder"}}>Editar Tipo</h1>
                <div className={styles.div_inputs}>
                <TextField
                    className={styles.inputBox}
                    id="nomnbre"
                    label="Nombre"
                    multiline
                    onChange={(ev) => setNombre(ev.target.value)}
                  />
                <label style={{color:"red",fontSize:"12px"}}>{nameError}</label>

                <button className={styles.button_editar} type="submit" onClick={handleSubmit}>Subir</button>
                </div>
            </div>
        </div>

    );

}