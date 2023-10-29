import React from 'react';
import "../scss/component/navbar.scss"
import { Link } from 'react-router-dom';

const Navbar = () => {
   return (
    <div className="container">
      <nav className="nav justify-content-center">
        <div className='list-link'>
          <Link to="/" className='link' >Home</Link>
          <Link to="/foods"className='link' >Foods</Link>
        </div>
      </nav>
    </div>
   )
 }

 export default Navbar;