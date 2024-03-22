import { useCallback, useState } from "react";
import { Grupo } from "../objetos/Grupo";
import { getGrupos } from "../controllers/firestore/grupos-services"; 
import useFetch from "./useFetch";


export default function useGrupos() {

    const {
        fetchingStatus: grupoStatus,
        } = useFetch<Grupo[]>({
        promiseFunction: getGrupos,
        });
        
        return {
            grupoStatus,
        };
    }

