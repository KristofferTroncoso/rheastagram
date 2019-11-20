import React from 'react';
import { Link } from 'react-router-dom';
import { Storage, Cache } from 'aws-amplify';
import SettingsModal from '../SettingsModal/SettingsModal';
import styled from 'styled-components/macro';


function InfoHeader({userData, loggedInUserData}) {
  const [imgKey, changeImgKey] = React.useState('');

  React.useEffect(() => {
    if (!userData.photoUrl) {
      console.log('userData.photoUrl is undefined');
    } else {
      let cacheRes = Cache.getItem(userData.photoUrl);
      if (cacheRes === null) {
        Storage.get(userData.photoUrl)
        .then(d => {
          changeImgKey(d);
          let dateNow = new Date();
          let expirationTime = dateNow.getTime() + 900000;
          Cache.setItem(userData.photoUrl, d, {expires: expirationTime });
        })
        .catch(err => console.log(err));
      } else {
        console.log(`cacheRes is ${cacheRes}`)
        changeImgKey(cacheRes);
      }
    }
  }, [userData.photoUrl])
  
  return (
    <div 
      className="InfoHeader"
      css={`
        height: 200px;
        display: flex;
        align-items: center;
        padding: 10px;
        margin: 100px auto 10px;
        max-width: 800px;
        margin-bottom: 30px;
        
        @media (max-width: 768px){ 
          margin: 60px auto 10px;
          height: 140px;
          max-width: 600px;
          padding: 4px;
        }
      `}
    >
      <div 
        className="InfoHeader_img_container"
        css={`
          background: lightgrey;
          clip-path: circle(77px at center);
          height: 100%;
          
          @media (max-width: 768px){ 
              height: 70px;
              clip-path: circle(36px at center);
          }
        `}
      >
        <img 
          className="InfoHeader_img" 
          alt={imgKey} 
          src={imgKey} 
          css={`
            height: 100%;
            clip-path: circle(76px at center);
            
            @media (max-width: 768px){ 
              height: 70px;
              clip-path: circle(35px at center);
            }
          `}
        /> 
      </div>
      <div>
        <div 
          className="InfoHeader_username_container"
          css={`
            display: flex;
            align-content: center;
            align-items: center;
            margin-bottom: 14px;
            
            @media (max-width: 768px){ 
              margin-bottom: 0px;
            }
          `}
        >
          <h1 
            className="InfoHeader_username" 
            css={`
              font-weight: 300;
              font-size: 34px;
              margin-bottom: 5px;
            `}
          >
            {userData.username}
          </h1>
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