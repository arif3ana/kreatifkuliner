import React from 'react';
import "../scss/component/navbar.scss"
import { Link } from 'react-router-dom';

const Navbar = () => {
   return (
    <div className="sticky-top">
      <nav className="nav justify-content-center">
        <div className='list-link container'>
          <Link to="/dashboard" className='link' >Home</Link>
          <Link to="/dashboard/myrecipe"className='link' >My Recipe</Link>
          <Link to="/dashboard/add"className='link' >Add Recipe</Link>
        </div>
      </nav>
    </div>
   )
 }

 export default Navbar;