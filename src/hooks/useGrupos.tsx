import { useCallback, useState } from "react";
import { Grupo } from "../objetos/Grupo";
import { getGrupos, deleteGrupo } from "../controllers/firestore/grupos-services"; 
import useFetch from "./useFetch";
import { generateRandomId } from "../utils";


export default function useGrupos() {

    const {
        fetchingStatus: grupoStatus,
        modificarBaseDeDatos: modificarGrupos,
        } = useFetch<Grupo[]>({
        promiseFunction: getGrupos,
        });

        function agregarGrupo(name, tipo, mision, vision, icon) {
            if (
                grupoStatus.status !== "success" 
            )
                return;
            
                modificarGrupos([
                ...grupoStatus.data,
                {
                    name: name,
                    tipo: tipo,
                    mision: mision,
                    vision: vision,
                    miembros: [],
                    icon: icon,
                    comentarios: [],
                    disponible: false,
                    id: generateRandomId()
                },
                ]);
            } 
        
        async function eliminarGrupo(ID) {
            if (
                grupoStatus.status !== "success" 
            )
            return;


            await deleteGrupo(ID);
            

            const nuevosGrupos = grupoStatus.data;

            modificarGrupos(nuevosGrupos);
        }

        return {
            grupoStatus,
            agregarGrupo,
            eliminarGrupo,

        };





    }

