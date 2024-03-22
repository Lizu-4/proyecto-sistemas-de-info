import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase"
import { Tipo } from "../../objetos/Tipo";

export async function getTipos() {
    try {
        const colReference = collection(db, "tipos")

        const querySnapshot = await getDocs(colReference);
        const tipos: Tipo[] = querySnapshot.docs.map((doc) => ({
            ...(doc.data() as any),
            id: doc.id,
            }));

        return tipos;

    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
}

export async function getTipoById(tipoID: string) {
    try {
        const docRef = doc(db, "tipos", tipoID);
        const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
            return null;
        }
    
    const tipo: Tipo = {
            ...(docSnap.data() as any),
            id: docSnap.id,
        };
        return tipo;
    } catch (error) {
        console.error("Error getting document: ", error);
        return null;
        }
    }
