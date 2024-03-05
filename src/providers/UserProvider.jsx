//El UserContext es un objeto de contexto que se utiliza para compartir el tema entre componentes.
import { UserContext } from '../context/user';
// se importa el hook useState desde la biblioteca react. El hook useState se utiliza para gestionar el estado del 
// user en el componente UserProvider.
import { useState } from 'react';

//El componente UserProvider es una función de React que recibe un objeto de propiedades llamado children. 
//children representa los componentes hijos que se envolverán con el tema proporcionado por UserProvider.
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <UserContext.Provider value={ user }>
      {children}
    </UserContext.Provider>
  );
}
