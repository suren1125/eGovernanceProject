import { Link } from 'react-router';
import React, { useContext, useEffect } from 'react'
import { AuthUserContext } from '../Context/AuthUserContext';

const Header = () => {
    const {user,logout} = useContext(AuthUserContext);

  return (
    <header className="px-[3rem] shadow-md  bg-white flex justify-between items-center py-3">
        <div className="font-bold text-xl"><Link to="/">eBallot</Link></div>
        <div className="flex items-center gap-6 font-semibold ">
          <nav><Link to="/">Home</Link></nav>
          <nav><a href="#elections">Elections</a></nav>
          <nav><Link to="/about">About</Link></nav>
          {
            user? <button className='button' onClick={logout}>Logout</button>
          
            :
            <div className='flex gap-3'>
              <Link to="/register" className='button'>Register</Link>
              <Link to="/login" className='button'>Login</Link>
            </div>
          }
         
        </div>
      </header>
  )
}

export default Header