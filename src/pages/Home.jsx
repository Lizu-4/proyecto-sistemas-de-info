import { logOut} from '../controllers/auth';
import { useUser } from '../context/user';
export default function Home() {
  const user = useUser();
  function mostrarDatos(){
    if(user !== null){
      alert(user.email);
    }else{
      alert("no hay sesion iniciada")
    }
  }
  return (
    <div>
      HOME
      <button onClick={() => logOut()}>cerrar sesion</button>
      <button onClick={() => mostrarDatos()}>mostrar datos usuario</button>
    </div>
  );
}
