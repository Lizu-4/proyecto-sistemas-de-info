import {EmailAuthCredential, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAdditionalUserInfo, onAuthStateChanged, sendEmailVerification, signInAnonymously, signInWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
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

export async function registerWithCredentialsAdmi(email, password,name,number){
  try{
    const {user} = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const usersCollection = collection(db,'administradores');
    await addDoc(usersCollection,{
        id: email,
        name: name,
        number:number,
        picture: user.photoURL
    });
      return user;
  }catch (e){
      console.error(e);
      return null;
  }
}

export async function ingresarGoogleEstudiante(){
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

export async function ingresarGoogleAdmi(){
  const result = await signInWithPopup(auth,googleProvider);
  const aditionalInfo = getAdditionalUserInfo(result);
  if(aditionalInfo.isNewUser){
    const usersCollection = collection(db,'administradores');
    await addDoc(usersCollection,{
      id:result.user.email,
      name: result.user.displayName,
      number: "",
      picture: result.user.photoURL
    });
  }
  return result.user;
}

export async function iniciarSesionGoogleAdmi(){
  const result = await signInWithPopup(auth,googleProvider);
  const aditionalInfo = getAdditionalUserInfo(result);
  if(aditionalInfo.isNewUser){
    const usersCollection = collection(db,'administradores');
    await addDoc(usersCollection,{
      id:result.user.email,
      name: result.user.displayName,
      number: "",
      picture: result.user.photoURL
    });
  }
  return result.user;
}

export async function logOut(){
  await signOut(auth);
}

// //dado un email, este metodo verificara si hay un email en la base de datos de firebase igual o no
// export function verificarUsuario(email){
//   //verifico si es un estudiante
//       const Collection = collection(db,'estudiantes');
//       const Snapshot = getDocs(Collection);
//       const user = Snapshot.docs.map((doc) => doc.data());
//       for (let i = 0; i < users.length; i++) {
//         if(user[i]['id'] === email){
//           return true;
//         }
//       }
//   //verifico si es un administrador
//     const usersCollection = collection(db,'administradores');
//     const usersSnapshot = getDocs(usersCollection);
//     const users = usersSnapshot.docs.map((doc) => doc.data());
//     for (let i = 0; i < users.length; i++) {
//       if(users[i]['id'] === email){
//         return true;
//       }
//     }
//     return false;
// }