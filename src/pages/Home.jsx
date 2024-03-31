import { cambiarContrasena, logOut} from '../controllers/auth';
import { useUser } from '../context/user';
import { Estudiante } from '../objetos/Estudiante';
import { Administrador } from '../objetos/Administrador';
import { Link, NavLink } from "react-router-dom";
import { auth } from '../firebase';
import styles from './Home.module.css';
import img from '../img/ingresar.jpg';
import missionImage from '../img/mision.jpeg';
import visionimg from '../img/vision.jpg';
import { routes } from "../constants/routes";
import pic1 from "../img/pic1.png";
import pic2 from "../img/pic2.png";
import pic3 from "../img/pic3.png";
import pic4 from "../img/pic4.png";
import home1 from "../img/home1.png";
import home2 from "../img/home2.png";


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
    <>
  
      <div class={styles.header}>
        <div class={styles.content}>
          <h1>Agrupaciones estudiantiles</h1>
          <p style={{fontSize: "19px"}}>Conoce las agrupaciones de tu universidad y <br />vive la mejor experiencia académicaa</p>
          <NavLink key={routes[1].path} to={routes[1].path} 
                  type="button" className="btn btn-primary" style={{backgroundColor: '#DD7A31', width: '7rem'}}>
                  Ver mas
           </NavLink>
        </div>
      </div>
      {/* <div className={styles.pics}>
        <img src={pic1} alt="..." className={styles.pic}/>
        <img src={pic2} alt="..." className={styles.pic}/>
        <img src={pic3} alt="..." className={styles.pic}/>
      </div> */}

      <div style={{display: 'flex', height: "350px"}}>
            <div id="carouselExampleInterval" style={{width: "50%"}} class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                  <img src={pic1} style={{height: "350px", objectFit: "fill"}}  class="d-block w-100" alt="..."/>
                </div>
                <div class="carousel-item" data-bs-interval="2000">
                  <img src={pic2} style={{height: "350px", objectFit: "fill"}} class="d-block w-100" alt="..."/>
                </div>
                <div class="carousel-item">
                  <img src={pic3} style={{height: "350px", objectFit: "fill"}} class="d-block w-100" alt="..."/>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            <div style={{padding: "4rem", width:"50%"}}>
            <h3>
            Contamos con una gran variedad de agrupaciones. Encuentra la que más se parezca a ti
            </h3>
            </div>
      </div>


      


      <div className={styles.baner} style={{ backgroundColor: "rgba(0, 10, 98, 0.068)"}} >
        <div style={{width:"50%", padding: "3rem"}}>
          <h1>Mision</h1>
          <p style={{fontSize: "19px"}}>
          Queremos fortalecer la vida estudiantil en la universidad, fomentando la participación activa, la colaboración y el enriquecimiento personal y académico de los estudiantes.
          </p>
        </div>
   
        <img src={home1} alt="" style={{ width:"50%", objectFit: "fill"}} />
        
      
      </div>

      <div className={styles.baner} >
      <img src={home2} alt="" style={{ width:"50%", objectFit: "fill"}} />
        <div style={{width:"50%", padding: "3rem"}}>
          <h1>Vision</h1>
          <p style={{fontSize: "19px"}}>
          buscamos promover un entorno en el que los estudiantes se sientan apoyados, motivados y capacitados para explorar sus intereses, participar activamente en la vida universitaria y contribuir de manera significativa al desarrollo de la comunidad estudiantil. 
          </p>
        </div>
      </div>

  


    </>

  );
}



