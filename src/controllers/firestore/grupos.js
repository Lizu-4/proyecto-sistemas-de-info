import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../../firebase"
import { Grupo } from "../../objetos/Grupo";


export async function getGrupos() {
    try {
        const colReference = collection(db, "grupos")

        const gruposDocs = await getDocs(colReference);

        const grupos = gruposDocs.docs.map((doc) => ({
            ...doc.data(), id: doc.id,
        })
        
        );
        
        return grupos;

    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
}

export async function getGrupoById(grupoID) {
    try {

        const docRef = collection(db, "grupos");
        const docSnap = await getDoc(doc(docRef, grupoID));
    
    if (!docSnap.exists()) {
            return null;
        }
    
    const grupo = docSnap.data();
        
        return grupo;


    } catch (error) {
        console.error("Error getting document: ", error);
        return null;
        }
    }

export async function deleteGrupo(grupoId) {
    try {
        console.log({ grupoId });
        const docRef = doc(db, "grupos", grupoId);

        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error removing document: ", error);
    }
    }

export async function modificarGrupo(id_grupo,grupo_modificado){
    try {
      const docRef = doc(db, "grupos", id_grupo);
  
      await setDoc(docRef, grupo_modificado, { merge: true });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }
  export async function crearGrupo(grupo_modificado){
    try {
      const gruposCollection = collection(db,'grupos'); 
      await addDoc(gruposCollection,grupo_modificado);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  export async function actualizarGrupo(id, grupo_modificado){
    try {
      const gruposCollection = collection(db,'grupos', id); 
      await setDoc(gruposCollection,grupo_modificado, {merge: true});
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

