import {getAdditionalUserInfo, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {auth,googleProvider} from "../firebase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { db } from '../firebase';


export async function iniciarSesion(email, password){
    try{
        const result = await signInWithEmailAndPassword(auth,email,password);
        return result;
        
    }catch (e){
        console.error(e);
        return null;
    }
}

export async function iniciarSesionGoogle(){
    const result = await signInWithPopup(auth,googleProvider);
    const aditionalInfo = getAdditionalUserInfo(result);
    if(aditionalInfo.isNewUser){
      const usersCollection = collection(db,'users');
      await addDoc(usersCollection,{
        id:result.user.email,
        name: result.user.displayName,
        picture: result.user.photoURL
      });
    }
    return result.user;
}