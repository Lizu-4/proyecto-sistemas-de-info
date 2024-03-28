import { cambiarContrasena, logOut} from '../controllers/auth';
import { useUser } from '../context/user';
import { Estudiante } from '../objetos/Estudiante';
import { Administrador } from '../objetos/Administrador';
import { auth } from '../firebase';
import styles from './Home.module.css';
import img from '../img/ingresar.jpg';
import missionImage from '../img/mision.jpeg';
import visionimg from '../img/vision.jpg';

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
      <sectionnn>
      <header>

        <h1 className={styles.titlee}>Agrupaciones Estudiantes</h1>
        <p1>
        Queremos fortalecer la vida estudiantil en la universidad, 
        fomentando la participación activa, la colaboración y el 
        enriquecimiento personal y académico de los estudiantes.
        </p1>
        <button className={styles.btnOrange}>Ver más</button>
        
      </header>
      </sectionnn>
      <main>
      <header>
        <img src={missionImage} alt="Person standing in front of a building" className={styles.img} />
        <sectionn>
        <h1 className={styles.titlee}>Mision</h1>
        <p1>
        Queremos fortalecer la vida estudiantil en la universidad,
        fomentando la participación activa, la colaboración y
        el enriquecimiento personal y académico de los estudiantes.

        </p1>
        </sectionn>
      </header>
      <img src={visionimg} alt="Mission Image" className={styles.missionImage} />
        <section>
         <h1 className={styles.title}>Visión</h1>
          <p>
            La visión de Agrupaciones Estudiantes es ser una organización líder
            en la formación y capacitación de jóvenes en la producción de
            alimentos, contribuyendo al desarrollo sostenible y la seguridad
            alimentaria en nuestra sociedad.
          </p>
          
        </section>
      
      </main>
    </div>
 
  );
}



