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
//Dados esos parametros. este metodo guardara los datos del estudiante en la base de datos de firebase
//Y tambien en la Autentificacion de firebase
//si el correo que se coloca ya existe, firebase lo detectara y no lo permitira
export async function registerWithCredentialsStudent(email, password,name,number){
  try{
    const {user} = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const usersCollection = collection(db,'estudiantes');
    await addDoc(usersCollection,{
        id: email,
        name: name,
        number:number,
        picture: user.photoURL,
        agrupaciones: []
    });
      return user;
  }catch (e){
      console.error(e);
      return null;
  }
}

export async function iniciarSesionGoogleEstudiante(){
    const result = await signInWithPopup(auth,googleProvider);
    const aditionalInfo = getAdditionalUserInfo(result);
    if(aditionalInfo.isNewUser){
      const usersCollection = collection(db,'estudiantes');
      await addDoc(usersCollection,{
        id:result.user.email,
        name: result.user.displayName,
        number: "",
        picture: result.user.photoURL,
        agrupaciones:[]
      });
    }
    return result.user;
}

export async function logOut(){
  await signOut(auth);
}