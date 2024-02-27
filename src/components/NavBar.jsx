import logo from '../img/UNIMET_neg.png'
import { Link, useParams } from 'react-router-dom';

export default function NavBar() {
    return (
     
        <nav className="navbar navbar-light" style={{ backgroundColor: '#000A62' }}>
        <div className="container-fluid">
            <div className='navbar-brand'>
                <img className="logo" width="100px" height="40px" src={logo} ></img>
            </div>
           
        </div>
      </nav> 


    );
  }