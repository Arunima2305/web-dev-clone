import React from 'react'
import logo from '../Netflix-Logo.png'
import {Link} from 'react-router-dom'
import {ImSearch} from 'react-icons/im'

const Header = () => {
  return (
    
    <nav className="header"> 
        <img src={logo} alt="Netflix" />
        <div>
            
            <Link to="/tv-shows">TV Shows</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/new">New & Popular</Link>
            <Link to="/browse">Browse by Language</Link>
            
            
        </div>        
        <ImSearch />
    </nav>
  )
}

export default Header