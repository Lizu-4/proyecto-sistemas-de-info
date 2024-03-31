
import { Link, NavLink, useParams } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState, useContext } from 'react';
import {useTipo, useTipos} from "../hooks/tipos";
import {useGrupos, useGrupo} from "../hooks/grupos";
import { useNavigate } from 'react-router-dom';
import styles from "./CrearGrupo.module.css";
import { modificarGrupo } from "../controllers/firestore/grupos";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import cargando from '../img/cargando.gif';

export default function EditarGrupo() {

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




     function handleSubmit() {
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
        
        try {
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
                alert("grupo modificado con exito");
                setName("");
                setMision("");
                setVision("");
                setIcon("");
                setTipo("");
            };
            reader.readAsDataURL(icon);
            navigate("/Dashboard");
        }catch (error) {
          setIconError("Por favor selecciona un archivo valido");
        }
   
    }


    return(
        
        <div className={styles.div_principal}>
        <div style={{ margin:'2%' }}>
            {/**FORM */}
            <h1 style={{textAlign: "center", fontWeight: "bolder"}}>Editar grupo</h1>
            <div className={styles.div_inputs}>
                <TextField
                    className={styles.inputBox}
                    defaultValue={grupo.name}
                    id="Nombre"
                    label="Nombre"
                    multiline
                    onChange={(ev) => setName(ev.target.value)}
                  />
                <label style={{color:"red",fontSize:"12px"}}>{nameError}</label>
                <br />
      
                <TextField
                  id="Disponibilidad"
                  className={styles.inputBox}
                  select
                  label="Disponible?"
                  defaultValue={grupo.disponible}
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
                  className={styles.inputBox}
                  select
                  label="Tipo"
                  defaultValue={grupo.tipo}
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
                    defaultValue={grupo.mision}
                    id="mision"
                    label="Mision"
                    multiline
                    onChange={(ev) => setMision(ev.target.value)}
                  />
                <label style={{color:"red",fontSize:"12px"}}>{misionError}</label>
                <br />

                <TextField
                    className={styles.inputBox}
                    defaultValue={grupo.vision}
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
                name="icon" 
                id="icon" 
                onChange={(ev) => setIcon(ev.target.files[0])}/>
                <label style={{color:"red",fontSize:"12px"}}>{iconError}</label>
                <br />
                

                <button className={styles.button_editar} type="submit" onClick={handleSubmit}>Subir</button>

            </div>
        </div>
    </div>

    );

}