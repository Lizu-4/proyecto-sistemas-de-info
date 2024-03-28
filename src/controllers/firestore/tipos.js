import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../../firebase"
import { Tipo } from "../../objetos/Tipo";


export async function getTipos() {
    try {
        const colReference = collection(db, "tipos")

        const  tiposDocs = await getDocs(colReference);

        const  tipos =  tiposDocs.docs.map((doc) => doc.data());
        
        return  tipos;

    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
}

export async function getTipoById( TipoID) {
    try {

        const docRef = doc(db, "tipos", TipoID);
        const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
            return null;
        }
    
    const  Tipo = docSnap.data();

        return  Tipo;

    } catch (error) {
        console.error("Error getting document: ", error);
        return null;
        }
    }

export async function deleteTipo( TipoId) {
    try {
        console.log({  TipoId });
        const docRef = doc(db, "tipos",  TipoId);

        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error removing document: ", error);
    }
    }

export async function modificarTipo(id_tipo, Tipo_modificado){
    try {
      const docRef = doc(db, "tipos", id_tipo);
  
      await setDoc(docRef,  Tipo_modificado, { merge: true });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }
  export async function crearTipo( Tipo_modificado){
    try {
      const  tiposCollection = collection(db,'tipos'); 
      await addDoc( tiposCollection, Tipo_modificado);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  export async function actualizarTipo(id,  Tipo_modificado){
    try {
      const  tiposCollection = collection(db,"tipos", id); 
      await setDoc( tiposCollection, Tipo_modificado, {merge: true});
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

