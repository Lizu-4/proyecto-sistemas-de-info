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

        function agregarGrupo(name, tipo, mision, vision, pictures, icon) {
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
                    pictures: pictures,
                    icon: icon,
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

