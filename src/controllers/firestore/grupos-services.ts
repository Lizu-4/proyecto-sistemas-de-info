import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase"
import { Grupo } from "../../objetos/Grupo";

export async function getGrupos() {
    try {
        const colReference = collection(db, "grupos")

        const querySnapshot = await getDocs(colReference);
        const grupos: Grupo[] = querySnapshot.docs.map((doc) => ({
            ...(doc.data() as any),
            id: doc.id,
            }));
        return grupos;

    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
}

export async function getGrupoById(grupoID: string) {
    try {
        const docRef = doc(db, "grupos", grupoID);
        const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
            return null;
        }
    
    const grupo: Grupo = {
            ...(docSnap.data() as any),
            id: docSnap.id,
        };
        return grupo;
    } catch (error) {
        console.error("Error getting document: ", error);
        return null;
        }
    }