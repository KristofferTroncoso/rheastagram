import React from 'react';
import './RNavbar.css';
import { Link } from 'react-router-dom';
import { Icon, Button } from 'antd';
import Avatar from '../Avatar/Avatar';

function RNavbar({userData}) {
  return (
    <div className="Navbar">
      <nav className="wrapper">
        <Link to="/">
          <div className="LogoAndTitle">
            <Icon className="Navbar_Instagram_icon" type="instagram" style={{color: '#3b3b3b'}} />
            <span className="Title">
              Rheastagram
            </span>
          </div>
        </Link>
        <div className="Search">
          <input type="text" className="Search_Box" placeholder="Search" />
        </div>
        {userData       
        ? (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Link to="/post" className="PostPhotoButton">
              <Button 
                style={{
                  margin: '0 10px'
                }}
              >
                <Icon type="camera" />
                <span style={{margin: '0 5px'}}>Post Photo</span>
              </Button>
            </Link>
            <Avatar img={userData.profilePhotoUrl} username={userData.username} />
          </div>
          )
        : <div>
            <button className="LogInBtn">Log In</button>
            <button className="SignUpBtn">Sign Up</button>
          </div>
        }
      </nav>
    </div>
  );
}

export default RNavbar;