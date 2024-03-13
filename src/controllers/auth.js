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
      alert("Crendenciales invalidas");
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
    const id = auth.currentUser.uid;
    const docRef = doc(db, "estudiantes", id);
    const data = {
        email: email,
        name: name,
        number:number,
        picture: user.photoURL,
        agrupaciones: [] 
    };
    await setDoc(docRef, data, { merge: true });
      return user;
  }catch (e){
      console.error(e);
      alert("Error! Es posible que el correo especificado, ya este en uso");
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
    const id = auth.currentUser.uid;
    const docRef = doc(db, "administradores", id);
    const data = {
        email: email,
        name: name,
        number:number,
        picture: user.photoURL
    };
    await setDoc(docRef, data, { merge: true });
      return user;
  }catch (e){
      console.error(e);
      alert("Error! Es posible que el correo especificado, ya este en uso");
      return null;
  }
}

export async function ingresarGoogleEstudiante(){
  try{
    const result = await signInWithPopup(auth,googleProvider);
    const aditionalInfo = getAdditionalUserInfo(result);
    const id = auth.currentUser.uid;
    if(aditionalInfo.isNewUser){
        const docRef = doc(db, "estudiantes", id);
        const data = {
        email:result.user.email,
        name: result.user.displayName,
        number: result.user.phoneNumber,
        picture: result.user.photoURL,
        agrupaciones:[]  
        };
        await setDoc(docRef, data, { merge: true });
        return true;
    }
    return result.user;
    
  }catch (e){
    console.error(e);
  }
}

export async function ingresarGoogleAdmi(){
  try{
    const result = await signInWithPopup(auth,googleProvider);
    const aditionalInfo = getAdditionalUserInfo(result);
    const id = auth.currentUser.uid;
    if(aditionalInfo.isNewUser){
        const docRef = doc(db, "administradores", id);
        const data = {
        email:result.user.email,
        name: result.user.displayName,
        number: result.user.phoneNumber,
        picture: result.user.photoURL
        };
        await setDoc(docRef, data, { merge: true });
        return true;
    }
    return result.user;
    
  }catch (e){
    console.error(e);
  }
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