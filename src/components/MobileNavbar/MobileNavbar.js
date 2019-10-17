import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

function MobileNavbar({userData}) {

  
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
      <Link to="/"><Icon type="home" style={{fontSize: '28px', color: '#3b3b3b'}} /></Link>
      <Link to="/post"><Icon type="plus-square" style={{fontSize: '38px', color: '#3b3b3b'}} /></Link>
      <Link to={`/user/${userData.username}`}><Icon type="user" style={{fontSize: '28px', color: '#3b3b3b'}} /></Link>
    </div>
  )
}

export default MobileNavbar;