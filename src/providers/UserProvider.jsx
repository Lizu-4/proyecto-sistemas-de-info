//El UserContext es un objeto de contexto que se utiliza para compartir el tema entre componentes.
import { UserContext } from '../context/user';
// se importa el hook useState desde la biblioteca react. El hook useState se utiliza para gestionar el estado del 
// user en el componente UserProvider.
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection,getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Estudiante } from '../objetos/Estudiante';
import { Administrador } from '../objetos/Administrador';

//El componente UserProvider es una función de React que recibe un objeto de propiedades llamado children. 
//children representa los componentes hijos que se envolverán con el tema proporcionado por UserProvider.
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  //dado un user, este metodo busca el estudiante en la base de datos, lo convierte en un objeto estudiante y cambia el estado del user.
  async function obtenerEstudiante(user){
      const usersCollection = collection(db,'estudiantes');
      const usersSnapshot = await getDocs(usersCollection);
      const users = usersSnapshot.docs.map((doc) => doc.data());
      for (let i = 0; i < users.length; i++) {
        if(users[i]['id'] === user.email){
          const estudiante = new Estudiante(users[i]['name'],users[i]['id'],users[i]['number'],users[i]['picture'],users[i]['agrupaciones']);
          console.log("student" );
          setUser(estudiante);
        }
      }
  }

  async function obtenerAdministrador(user){
    const usersCollection = collection(db,'administradores');
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => doc.data());
    for (let i = 0; i < users.length; i++) {
      if(users[i]['id'] === user.email){
        const admi = new Administrador(users[i]['name'],users[i]['id'],users[i]['number'],users[i]['picture']);
        console.log("admi" );
        setUser(admi);
      }
    }
}

  //cada vez que el auth cambie pasara por aqui
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("sesion iniciada");
        obtenerEstudiante(user);//esta funcion convertira el estado del user en el objeto estudiante que acaba de iniciar sesion
        obtenerAdministrador(user);
      } else {
        console.log("sesion cerrada");
        setUser(user);//el estado del user sera null
      }
    });
  }, []);
  
  return (
    <UserContext.Provider value={ user }>
      {children}
    </UserContext.Provider>
  );
}
