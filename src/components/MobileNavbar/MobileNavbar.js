import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaPlusSquare, FaRegPlusSquare, FaUser, FaRegUser } from 'react-icons/fa';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import './MobileNavbar.css';

function MobileNavbar({userData}) {
  const [currentPage, changeCurrentPage] = React.useState();
  React.useEffect(() => {
    console.log(currentPage)
  }, [currentPage])
  return (
    <div 
      className="MobileNavbar"
      style={{
        background: 'white',
        height: '50px',
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        padding: '0 10px 0',
        borderTop: '1px solid #e6e6e6',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}      
    >
      <NavLink 
        exact
        to="/"
        isActive={(match, location) => {
          match ? changeCurrentPage('home') : console.log('yo')
        }}
      >
        {currentPage === 'home'
          ? <AiFillHome style={{fontSize: '34px', color: '#3b3b3b'}} />
          : <AiOutlineHome style={{fontSize: '34px', color: '#3b3b3b'}} />
        }
      </NavLink>
      <NavLink 
        to="/post" 
        isActive={(match, location) => {
          match ? changeCurrentPage('post') : console.log('yo')
        }}
      >
        {currentPage === 'post'
          ? <FaPlusSquare style={{fontSize: '38px', color: '#3b3b3b'}} />
          : <FaRegPlusSquare style={{fontSize: '38px', color: '#3b3b3b'}} />
        }
      </NavLink>
      <NavLink 
        to={`/user/${userData.username}`}
        isActive={(match, location) => {
          match ? changeCurrentPage('user') : console.log('yo')
        }}        
      >
        {currentPage === 'user'
          ? <FaUser style={{fontSize: '30px', color: '#3b3b3b'}} />
          : <FaRegUser style={{fontSize: '30px', color: '#3b3b3b'}} />
        }
      </NavLink>
    </div>
  )
}

export default MobileNavbar;