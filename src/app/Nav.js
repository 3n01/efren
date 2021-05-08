import React from 'react';
import {Link } from 'react-router-dom';
import '../public/css/style.css';

function Nav(){

    const navStyle = {
        color : 'black'
    }

    return(
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link  style={navStyle} to="/home"><li>Home</li></Link>
            </ul>
        </nav>
    )
}

export default Nav