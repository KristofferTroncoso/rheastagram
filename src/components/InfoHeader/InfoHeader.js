import React from 'react';
import './InfoHeader.css';
import { Link } from 'react-router-dom';
import { Storage } from 'aws-amplify';
import { Icon } from 'antd';


function InfoHeader({userData, loggedInUserData}) {
  const [imgKey, changeImgKey] = React.useState('');
  
  React.useEffect(() => {
    Storage.get(userData.profilePhotoUrl).then(d => changeImgKey(d)).catch(err => console.log(err));
  }, [userData.profilePhotoUrl]);
  
  return (
    <div className="InfoHeader wrapper">
      {userData.profilePhotoUrl ? <img className="InfoHeader_img" alt={imgKey} src={imgKey} /> : null}
      <div>
        <div style={{display: 'flex', alignContent: 'center', alignItems: 'baseline', marginBottom: '20px'}}>
          <h1 className="InfoHeader_username" style={{marginBottom: 0}}>{userData.username}</h1>
          {userData.username === loggedInUserData.username 
            ? <>
                <Link to="/editprofile">
                  <button style={{padding: '2px 6px', margin: '0 20px', color: 'black', borderRadius: '4px'}}>
                    Edit Profile
                  </button>
                </Link>
                <Icon type="setting" style={{fontSize: '25px'}} />
              </>
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