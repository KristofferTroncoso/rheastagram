import React from 'react';
import './InfoHeader.css';
import { Link } from 'react-router-dom';
import { Storage } from 'aws-amplify';


function InfoHeader({userData, loggedInUserData}) {
  const [imgKey, changeImgKey] = React.useState('');
  
  React.useEffect(() => {
    Storage.get(userData.profilePhotoUrl).then(d => changeImgKey(d)).catch(err => console.log(err));
  }, [userData.profilePhotoUrl]);
  
  return (
    <div className="InfoHeader wrapper">
      {userData.profilePhotoUrl ? <img alt={imgKey} src={imgKey} /> : null}
      <div>
        <div style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
          <h1>{userData.username}</h1>
          {userData.username === loggedInUserData.username 
            ? <Link to="/editprofile">
                <button style={{padding: '4px 6px', margin: '0 20px', color: 'black', borderRadius: '4px'}}>
                  Edit Profile
                </button>
              </Link>
            : null
          }
        </div>
        <h3>{userData.name}</h3>
        <p>{userData.bio}</p>
      </div>
    </div>
  );
}

export default InfoHeader;