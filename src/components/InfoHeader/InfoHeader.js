import React from 'react';
import './InfoHeader.css';
import { Link } from 'react-router-dom';
import { Storage, Cache } from 'aws-amplify';
import SettingsModal from '../SettingsModal/SettingsModal';


function InfoHeader({userData, loggedInUserData}) {
  const [imgKey, changeImgKey] = React.useState('');

  React.useEffect(() => {
    let cacheRes = Cache.getItem(userData.profilePhotoUrl);
    if (cacheRes === null) {
      Storage.get(userData.profilePhotoUrl)
      .then(d => {
        changeImgKey(d);
        let dateNow = new Date();
        let expirationTime = dateNow.getTime() + 900000;
        Cache.setItem(userData.profilePhotoUrl, d, {expires: expirationTime });
      })
      .catch(err => console.log(err));
    } else {
      changeImgKey(cacheRes);
    }
  }, [userData.profilePhotoUrl])
  
  return (
    <div className="InfoHeader wrapper" style={{marginBottom: '30px'}}>
      <div className="InfoHeader_img_container">
      {userData.profilePhotoUrl ? <img className="InfoHeader_img" alt={imgKey} src={imgKey} /> : null}
      </div>
      <div>
        <div className="InfoHeader_username_container">
          <h1 className="InfoHeader_username" style={{marginBottom: '5px'}}>{userData.username}</h1>
          {userData.username === loggedInUserData.username 
            ? <>
                <Link to="/editprofile">
                  <button style={{padding: '2px 6px', margin: '0 20px', color: 'black', borderRadius: '4px'}}>
                    Edit Profile
                  </button>
                </Link>
                <SettingsModal />
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