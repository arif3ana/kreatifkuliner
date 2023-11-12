import React from 'react';
import { Link } from 'react-router-dom';
import "../scss/component/navbar.scss"

const Navbar = () => {
   return (
    <div className="sticky-top">
      <nav className="nav justify-content-center">
        <div className='list-link container'>
          <Link to="/dashboard" className={`link ${location.pathname == '/dashboard' && 'active'}`} >Home</Link>
          <Link to="/dashboard/myrecipe"className={`link ${location.pathname == '/dashboard/myrecipe' && 'active'}`} >My Recipe</Link>
          <Link to="/dashboard/add"className={`link ${location.pathname == '/dashboard/add' && 'active'}`} >Add Recipe</Link>
        </div>
      </nav>
    </div>
   )
 }

 export default Navbar;