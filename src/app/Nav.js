import React from 'react';
import { Link } from 'react-router-dom';
import '../public/css/style.css';

function Nav() {

  const navStyle = {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: '15px',
    textDecoration: 'none',
    borderBottom: '1px solid gray'
  }

  const mainNavStyle = {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: '16px',
    textDecoration: 'none'
  }

  const extStyle = {
    backgroundColor : 'white'

  }


  return (
    <nav clasName="" style={extStyle} >
      <div clasName="">
          <ul class="">
             <li clasName="nav-item">
             <Link style={navStyle}  to="/">Gestion Imágenes</Link>
             </li>
            <li className="nav-item">
              <Link style={navStyle} to="/noticias"><li>Gestión Noticias</li></Link>
            </li>

          </ul>

      </div>
    </nav>
  )
}

export default Nav