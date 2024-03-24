import { useUser } from '../context/user';
import styles from './Perfil.module.css';


import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

import { Estudiante } from '../objetos/Estudiante';

export default function Perfil() {
  const {user,setUser} = useUser();

  return (
    <div className={styles.div_principal}>
      {/* primer div */}
      <div className={styles.primer_div}>
        <div>
          <img className={styles.avatar} src={user.picture} ></img>
          {user instanceof Estudiante?
          <p style={{textAlign:"center", fontSize:"100%"}}>Estudiante</p>:
          <p style={{textAlign:"center", fontSize:"100%"}}>Administrador</p>}
        </div>
        <div className={styles.titleContainer}>
          {/* <p style={{color: "#4BC3B5"}}> {user instanceof Estudiante ? "Estudiante":"Administrador"}</p> */}
          <p style={{fontSize:"60%"}}> {user.name} </p>
          <p style={{ fontSize: "30%"}}>{user.email}</p>
          <p style={{ fontSize: "30%"}}> {user.number} </p>
        </div>
        <div>
        <Link to="/EditarPerfil">
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab color="warning" aria-label="edit">
            <EditIcon />
          </Fab>
        </Box>
        </Link>
        </div>
      </div>
    </div>
  );
}
