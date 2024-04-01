// Hook para obtener todos los grupos académicos
import { useEffect, useState } from "react";
import { getGrupos, getGrupoById } from "../controllers/firestore/grupos";

export function useGrupos() {
    const [grupos, setGrupos] = useState(null);

    useEffect(() => {
        const load = async () => {
            const grupos = await getGrupos();
            
            setGrupos(grupos);
        };
        load();
    }, []);
    return grupos;
}
// Hook para obtener un grupo académico por su ID
export function useGrupo(id) {
    const [grupo, setGrupo] = useState(null);

    useEffect(() => {
        const load = async () => {
            const grupo = await getGrupoById(id);
            setGrupo(grupo);
        };
        load();
    }, []);
    return grupo;
}