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
    <nav className="" style={extStyle} >
      <div className="">
          <ul className="">
             <li className="nav-item">
              <Link style={navStyle}  to="/">Gestion Imágenes</Link>
             </li>
            <li className="nav-item">
              <Link style={navStyle} to="/noticias">Gestión Noticias</Link>
            </li>
            <li className="nav-item">
              <Link style={navStyle} to="/bio">Gestión Bio</Link>
            </li>
          </ul>

      </div>
    </nav>
  )
}

export default Nav