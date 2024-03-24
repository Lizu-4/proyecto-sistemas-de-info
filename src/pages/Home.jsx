import { cambiarContrasena, logOut} from '../controllers/auth';
import { useUser } from '../context/user';
import { Estudiante } from '../objetos/Estudiante';
import { Administrador } from '../objetos/Administrador';
import { auth } from '../firebase';

export default function Home() {
  const {user, setUser} = useUser();
  function mostrarDatos(){
    if(user !== null){
      alert(user.name + "\n" + user.email + "\n" + auth.currentUser.email + "\n"+ user.number + "\n" + user.picture + "\n" + user.agrupaciones);
    }else{
      alert("no hay sesion iniciada")
    }
  }
  function tipo(){
    console.log(user);
    if(user instanceof Estudiante){
      alert("Estudiante");
    }else if(user instanceof Administrador){
      alert("Administrador")
    }else{
      alert("null");
    }
  }
  return (
    <div>
      HOME
      <button onClick={() => logOut()}>cerrar sesion</button>
      <button onClick={() => mostrarDatos()}>mostrar datos usuario</button>
      <button onClick={() => tipo()}>mostrar tipo usuario</button>
    </div>
  );
}
