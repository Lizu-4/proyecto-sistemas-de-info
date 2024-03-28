import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, addDoc } from "firebase/firestore";
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

export async function deleteGrupo(grupoId: string) {
    try {
        console.log({ grupoId });
        const docRef = doc(db, "grupos", grupoId);

        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error removing document: ", error);
    }
    }

export async function updateGrupo(grupoId: string, grupoModificado: Object) {
    try {
        const docRef = doc(db, "grupos", grupoId);

        await setDoc(docRef, grupoModificado, { merge: true })
    
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

export async function createGrupo({name, tipo, mision, vision, icon}) {
    
    try {
      const colReference = collection(db, "grupos");
  
      await addDoc(colReference, {
        name,
        tipo,
        mision,
        vision,
        miembros: [],
        icon,
        disponible: false,
        comentarios: [],
    });
    
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

// name: string, tipo: string, mision:string, vision:string, fotos:string, icon:string