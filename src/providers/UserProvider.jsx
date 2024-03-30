//El UserContext es un objeto de contexto que se utiliza para compartir el tema entre componentes.
import { UserContext } from '../context/user';
// se importa el hook useState desde la biblioteca react. El hook useState se utiliza para gestionar el estado del 
// user en el componente UserProvider.
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection,getDocs,doc,getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { Estudiante } from '../objetos/Estudiante';
import { Administrador } from '../objetos/Administrador';
import cargando from '../img/cargando.gif';
import { modificarEstudiante } from '../controllers/auth';

//El componente UserProvider es una función de React que recibe un objeto de propiedades llamado children. 
//children representa los componentes hijos que se envolverán con el tema proporcionado por UserProvider.
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //dado un user, este metodo busca el estudiante en la base de datos, lo convierte en un objeto estudiante y cambia el estado del user.
  async function obtenerEstudiante(user){
    try{
      const docRef = doc(db, "estudiantes", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // Accede a los campos del documento utilizando la sintaxis data.<nombre_del_campo>
        const estudiante = new Estudiante(data.name,data.email,data.number,data.picture,data.agrupaciones);
        setUser(estudiante);
      }
    }catch (e){
      console.error(e,"error en funcion obtenerEstudiante");
    }
  }

  async function obtenerAdministrador(user){
    try{
      const docRef = doc(db, "administradores", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // Accede a los campos del documento utilizando la sintaxis data.<nombre_del_campo>
        const admi = new Administrador(data.name,data.email,data.number,data.picture);
        setUser(admi);
      }
    }catch (e){
      console.error(e,"error en funcion obtenerAdministrador");
    }
}

  //cada vez que el auth cambie pasara por aqui
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("sesion iniciada");
        console.log(user);
        obtenerEstudiante(user);//esta funcion convertira el estado del user en el objeto estudiante que acaba de iniciar sesion
        obtenerAdministrador(user);
      } else {
        console.log("sesion cerrada");
        setUser(user);//el estado del user sera null
      }
    });
  }, []);
  
  return (
    <UserContext.Provider value = {{user,setUser} }>
      {children}
    </UserContext.Provider>
  );
}
