import {createUserWithEmailAndPassword, getAdditionalUserInfo, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {auth,googleProvider} from "../firebase";
import { addDoc, collection, setDoc, doc,getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { Estudiante } from "../objetos/Estudiante";

export async function loginWithCredentials(email, password){
  try{
      await signInWithEmailAndPassword(auth,email,password);
      
  }catch (e){
      console.error(e);
  }
}

export async function registerWithCredentials(email, password,nombre,apellido,telefono){
  try{
    const {user} = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const usersCollection = collection(db,'estudiantes');
    await addDoc(usersCollection,{
        id: email,
        name: nombre,
        last_name: apellido,
        number:telefono,
        picture: user.photoURL
    });
      return user;
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

export async function logOut(){
  await signOut(auth);
}