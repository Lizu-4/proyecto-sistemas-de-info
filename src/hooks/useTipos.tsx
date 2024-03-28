import { useCallback, useState } from "react";
import { Tipo } from "../objetos/Tipo";
import { getTipos, deleteTipo } from "../controllers/firestore/tipos-services"; 
import useFetch from "./useFetch";
import { generateRandomId } from "../utils";


export default function useTipos() {

    const {
        fetchingStatus: tipoStatus,
        modificarBaseDeDatos: modificarTipos,
        } = useFetch<Tipo[]>({
        promiseFunction: getTipos,
        });

        function agregarTipo({nombre}) {
            if (
                tipoStatus.status !== "success" 
            )
                return;
            
                modificarTipos([
                ...tipoStatus.data,
                {
                    nombre: nombre,
                    id: generateRandomId()
                },
                ]);
        }

        async function eliminarTipo(ID) {
            if (
                tipoStatus.status !== "success" 
            )
                return;
        
                await deleteTipo(ID);
        
                const nuevosTipos = tipoStatus.data;
        
                modificarTipos(nuevosTipos);
        }
        
        return {
            tipoStatus,
            agregarTipo,
            eliminarTipo,

        };
    }

