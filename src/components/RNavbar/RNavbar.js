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
          <Icon type="instagram" style={{fontSize: '26px', color: 'black', marginRight: '22px'}} />
          <span className="Title" style={{margin: "0 0 4px 0px", paddingLeft: '18px', borderLeft: '1px solid #4a4a4a'}}>
            Rheastagram
          </span>
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
            <Button 
              onClick={e => {Auth.signOut().then(d => console.log(d))}}
              style={{color: 'salmon'}}
              type="link"
            > 
              Log Out
            </Button>
            
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