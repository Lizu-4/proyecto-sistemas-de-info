import { useEffect, useState } from "react";
import { getTipos, getTipoById } from "../controllers/firestore/tipos";
// Hook para obtener todos los tipos
export function useTipos() {
    const [tipos, setTipos] = useState(null);

    useEffect(() => {
        const load = async () => {
            const tipos = await getTipos();
            setTipos(tipos);
        };
        load();
    }, []);
    return tipos;
}
// Hook para obtener un tipo por su ID
export function useTipo(id) {
    const [tipo, setTipo] = useState(null);

    useEffect(() => {
        const load = async () => {
            const tipo = await getTipoById(id);
            setTipo(tipo);
        };
        load();
    }, []);
    return tipo;
}