import React from 'react';
import './RNavbar.css';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Icon, Button } from 'antd';
import Avatar from '../Avatar/Avatar';

function RNavbar({userData}) {
  return (
    <div className="Navbar">
      <nav className="wrapper">
        <Link to="/">
          <Icon type="instagram" style={{fontSize: '26px', color: 'black'}} />
          <span style={{fontSize: '36px', color: 'black', margin: '0 15px'}}>|</span>
          <span className="Title" style={{margin: "0 0 4px 0"}}>
            Rheastagram
          </span>
        </Link>
        <div>
          <input type="text" className="Search" placeholder="Search (pics of Rhea)" />
        </div>
        {userData       
        ? (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Link to="/post">
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
            <button 
              onClick={e => {Auth.signOut().then(d => console.log(d))}}
              style={{background: 'inherit', border: 0, color: 'grey', margin: '0 10px'}}
            > 
              Log Out
            </button>
            
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