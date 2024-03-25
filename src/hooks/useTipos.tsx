import { useCallback, useState } from "react";
import { Tipo } from "../objetos/Tipo";
import { getTipos } from "../controllers/firestore/tipos-services"; 
import useFetch from "./useFetch";


export default function useTipos() {

    const {
        fetchingStatus: tipoStatus,
        } = useFetch<Club[]>({
        promiseFunction: getTipos,
        });
        
        return {
            tipoStatus,
        };
    }

