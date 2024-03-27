import useTipos from "../hooks/useTipos";
import useGrupos from "../hooks/useGrupos";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./CrearGrupo.module.css";
import { createGrupo, updateGrupo, deleteGrupo } from "../controllers/firestore/grupos-services";

export default function CrearGrupo() {

    
    const [name, setName] = useState("");
    const [mision, setMision] = useState("");
    const [vision, setVision] = useState("");
    const [icon, setIcon] = useState("");
    const [tipo, setTipo] = useState("");
    const [pictures, setPictures] = useState([]);
    const [fotos, setFotos] = useState([]);

    const {
        tipoStatus,
    } = useTipos();

    const {
        grupoStatus, agregarGrupo, modificarBaseDeDatos,
    } = useGrupos();

    const tipos = tipoStatus.data;

    
    const grupos = grupoStatus.data;

    
    if (
        tipoStatus.status === "loading" ) {

        return <div>Cargando...</div>;
    } else if (
        tipoStatus.status === "error" ) {
        return <div>Error al cargar los datos</div>;
    }
    
    function handleICon(icon) {
        console.log(icon);
        console.log("prev");
        if (icon !== "" ) {
            var reader = new FileReader();
            reader.onload = function (icon) {
            console.log("aqui");
            const url = icon.target.result;
            setIcon(url);
        };
        
   //reader.readAsDataURL(icon);
   setIcon(reader.readAsDataURL(icon));
    console.log(icon);
    console.log("listo");
    }
}

// async function handleIcon(icon) {
//     console.log(icon);
//     console.log("prev");
    
//     if (icon !== null && icon !== "") {
//         const reader = new FileReader();
    
//         reader.onload = function (e) {
//             const url = e.target.result;
//             setIcon(url);
//             console.log("asi salio");
//             resolve(url);
//         };
//         console.log("fuera");
//         console.log(icon);
//         reader.readAsDataURL(icon);
//         }
//     }


    // function handlePictures(fotos) {
    //     fotos.map((event) => {
    //         const reader = new FileReader();
    //         reader.onload = function (event) {
    //             const url = event.target.result;
    //             const fotos = [...pictures];
    //             fotos.push(url);
    //             setPictures(fotos);
    //         };
    //     })
    // }
        // function handlePictures(fotos) {
        //     for (const file of fotos) {
        //     const reader = new FileReader();
        //     reader.onload = (event) => {
        //         const url = event.target.result;
        //         setPictures((prevPictures) => [...prevPictures, url]);
        //     };
        //     reader.readAsDataURL(file);
        //     }
        // }

    async function handleSubmit() {
   // await handleIcon(icon);
   handleICon(icon);
    console.log("submit");
    console.log(icon);
    console.log({name, tipo, mision, vision, pictures, icon});

    await createGrupo({ name, tipo, mision, vision, pictures, icon});
        if (agregarGrupo){
            agregarGrupo({ name, tipo, mision, vision, pictures, icon});

        }if (modificarBaseDeDatos){
        modificarBaseDeDatos({ name, tipo, mision, vision, pictures, icon});
        }
        alert("grupo creado");
        setName("");
        setMision("");
        setVision("");
        setIcon("");
        setTipo("");
        setPictures([]);
        setFotos([]);
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
                
                <label htmlFor="pictures">Fotos:</label>
                <input type="file"
                multiple
                name="pictures"
                id="pictures"
                onChange={(ev) => setPictures(ev.target.files)}/>

                <button type="submit" onClick={handleSubmit}>Subir</button>

            </div>
        </div>
    </div>

    );

}