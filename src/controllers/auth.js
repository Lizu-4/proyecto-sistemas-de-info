import {EmailAuthCredential, EmailAuthProvider, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAdditionalUserInfo, onAuthStateChanged, sendEmailVerification, signInAnonymously, signInWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut, verifyBeforeUpdateEmail} from "firebase/auth";
import {auth,googleProvider,facebookProvider} from "../firebase";
import { addDoc, collection, setDoc, doc,getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { Estudiante } from "../objetos/Estudiante";
import { updateEmail,updateProfile,sendPasswordResetEmail } from "firebase/auth";

// export async function actualizarEmail(newEmail) {
//   try {
//     verifyBeforeUpdateEmail(auth.currentUser, newEmail).then(() => {
//       // Email updated!
//       // ...
//       alert("Se te ha enviado un enlace al nuevo email para verificarlo.")
//     }).catch((error) => {
//       // An error occurred
//       // ...
//       console.error(error);
//     });
    
//   } catch (error) {
//     console.error(error);
//   }
// }
export async function cambiarContrasena(email){
  sendPasswordResetEmail(auth,email)
  .then(() => {
    alert("Se te ha enviado un mensaje al email indicado. \nSiga las instrucciones para obtener una nueva contraseña.");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(error);
    // ..
  });

}

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
        picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gkd0qUkv1F9epnQv4Wv0cgvrsGkJ7pETR3VEbPF1ne6SGhhkYXybBInQ5CGShqmPtyE&usqp=CAU",
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
        picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gkd0qUkv1F9epnQv4Wv0cgvrsGkJ7pETR3VEbPF1ne6SGhhkYXybBInQ5CGShqmPtyE&usqp=CAU"
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
        picture: result.user.photoURL ? result.user.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gkd0qUkv1F9epnQv4Wv0cgvrsGkJ7pETR3VEbPF1ne6SGhhkYXybBInQ5CGShqmPtyE&usqp=CAU',
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
        picture: result.user.photoURL ? result.user.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gkd0qUkv1F9epnQv4Wv0cgvrsGkJ7pETR3VEbPF1ne6SGhhkYXybBInQ5CGShqmPtyE&usqp=CAU',
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
export async function modificarEstudiante(user_modificado){
  try {
    const id = auth.currentUser.uid;
    const docRef = doc(db, "estudiantes", id);

    await setDoc(docRef, user_modificado, { merge: true });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
export async function modificarAdministrador(user_modificado){
  try {
    const id = auth.currentUser.uid;
    const docRef = doc(db, "administradores", id);

    await setDoc(docRef, user_modificado, { merge: true });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
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

export async function ingresarFacebookEstudiante(){
  try{
    const result = await signInWithPopup(auth,facebookProvider);
    const aditionalInfo = getAdditionalUserInfo(result);
    const id = auth.currentUser.uid;
    if(aditionalInfo.isNewUser){
        const docRef = doc(db, "estudiantes", id);
        const data = {
        email:result.user.email,
        name: result.user.displayName,
        number: result.user.phoneNumber,
        picture: result.user.photoURL ? result.user.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gkd0qUkv1F9epnQv4Wv0cgvrsGkJ7pETR3VEbPF1ne6SGhhkYXybBInQ5CGShqmPtyE&usqp=CAU',
        agrupaciones:[]  
        };
        await setDoc(docRef, data, { merge: true });
        return true;
    }
    return result.user;
    
  }catch (e){
    console.error(e);
    alert(e);
  }
}

export async function ingresarFacebookAdmi(){
  try{
    const result = await signInWithPopup(auth,facebookProvider);
    const aditionalInfo = getAdditionalUserInfo(result);
    const id = auth.currentUser.uid;
    if(aditionalInfo.isNewUser){
        const docRef = doc(db, "administradores", id);
        const data = {
        email:result.user.email,
        name: result.user.displayName,
        number: result.user.phoneNumber,
        picture: result.user.photoURL ? result.user.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gkd0qUkv1F9epnQv4Wv0cgvrsGkJ7pETR3VEbPF1ne6SGhhkYXybBInQ5CGShqmPtyE&usqp=CAU',
        };
        await setDoc(docRef, data, { merge: true });
        return true;
    }
    return result.user;
    
  }catch (e){
    console.error(e);
    alert(e);
  }
}