import {useTipos} from "../hooks/tipos";
import {useGrupos} from "../hooks/grupos";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./CrearGrupo.module.css";
import { crearGrupo} from '../controllers/firestore/grupos';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import cargando from '../img/cargando.gif';

export default function CrearGrupo() {

    
    const [loadingGrupos, setLoadingGrupos] = useState(true);
    const [loadingTipos, setLoadingTipos] = useState(true);
    const [name, setName] = useState("");
    const [mision, setMision] = useState("");
    const [vision, setVision] = useState("");
    const [icon, setIcon] = useState("");
    const [tipo, setTipo] = useState("");
    const [disponible, setDisponible] = useState(true);
    const [nameError, setNameError] = useState("");
    const [misionError, setMisionError] = useState("");
    const [visionError, setVisionError] = useState("");
    const [tipoError, setTipoError] = useState("");
    const [iconError, setIconError] = useState("");
    const [disponibleError, setDisponibleError] = useState("");
    const navigate = useNavigate();

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
        return (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
            <img width="40%" height="20%" src={cargando}/>
          </div>
        );
      }

      if (loadingTipos) {
        return (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
            <img width="40%" height="20%" src={cargando}/>
          </div>
        );
      }


    async function handleSubmit() {
        setNameError("");
        setMisionError("");
        setVisionError("");
        setDisponibleError("");
        setIconError("");
        setTipoError("");
        if(name === ""){
          setNameError("Por favor colocale un Nombre a la agrupacion");
          return;
        }
        if(disponible === ""){
          setDisponibleError("Por favor selecciona la disponibilidad");
          return;
        }
        if(tipo === ""){
          setTipoError("Por favor selecciona un Tipo");
          return;
        }
        if(mision === ""){
          setMisionError("Por favor colocale una Mision a la agrupacion");
          return;
        }
        if(vision === ""){
          setVisionError("Por favor colocale una Vision a la agrupacion");
          return;
        }
        if(icon === ""){
          setIconError("Por favor selecciona un icono para la agrupacion");
          return;
        }
        
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
               crearGrupo(grupo_modificado);
               console.log(grupo_modificado);
                alert("grupo creado");
                setName("");
                setMision("");
                setVision("");
                setIcon("");
                setTipo("");
              navigate("/Dashboard");
            };
            reader.readAsDataURL(icon);
        }
    }


    return(
        
        <div className={styles.div_principal}>
        <div style={{ margin:'2%' }}>
            {/**FORM */}
            <h1 style={{textAlign: "center", fontWeight: "bolder"}}>Crear grupo</h1>
            <div className={styles.div_inputs}>
            <TextField
                    className={styles.inputBox}
                    id="Nombre"
                    label="Nombre"
                    multiline
                    onChange={(ev) => setName(ev.target.value)}
                  />
                <label style={{color:"red",fontSize:"12px"}}>{nameError}</label>
                <br />
      
                <TextField
                  id="Disponibilidad"
                  select
                  label="Disponible?"
                  defaultValue={true}
                  onChange={(ev) => setDisponible(ev.target.value)}
                >
                    <MenuItem key="true" value={true}>
                      Si
                    </MenuItem>
                    <MenuItem key="false" value={false}>
                      No
                    </MenuItem>
                </TextField>
                <label style={{color:"red",fontSize:"12px"}}>{disponibleError}</label>
                <br />
                <TextField
                  id="Tipos"
                  select
                  label="Tipo"
                  onChange={(ev) => setTipo(ev.target.value)}
                >
                  {tipos.map((type) => (
                    <MenuItem key={type.nombre} value={type.nombre}>
                      {type.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <label style={{color:"red",fontSize:"12px"}}>{tipoError}</label>
                <br />

                <TextField
                    className={styles.inputBox}
                    id="mision"
                    label="Mision"
                    multiline
                    onChange={(ev) => setMision(ev.target.value)}
                  />
                <label style={{color:"red",fontSize:"12px"}}>{misionError}</label>
                <br />

                <TextField
                    className={styles.inputBox}
                    id="vision"
                    label="Vision"
                    multiline
                    onChange={(ev) => setVision(ev.target.value)}
                  />
                <label style={{color:"red",fontSize:"12px"}}>{visionError}</label>
                <br />

                <label htmlFor="icon">Icon del grupo:</label>
                <input
                type="file"
                accept="image/*"
                name="icon" 
                id="icon" 
                onChange={(ev) => setIcon(ev.target.files[0])}/>
                <label style={{color:"red",fontSize:"12px"}}>{iconError}</label>
                <br />
                <button className={styles.button_editar} type="submit" onClick={handleSubmit}>Crear Grupo</button>

            </div>
        </div>
    </div>

    );

}