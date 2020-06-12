/** @jsx jsx */
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SettingsModal from '../SettingsModal/SettingsModal';
import { jsx, css } from '@emotion/core';
import useSignedS3Url from '../../hooks/useSignedS3Url';

function InfoHeader({userData, loggedInUserData}) {
  const imgKey = useSignedS3Url(userData.photoUrl);
  
  return (
    <div 
      className="InfoHeader"
      css={css`
        height: 180px;
        display: flex;
        align-items: center;
        padding: 10px;
        margin: 5px auto 10px;
        max-width: 800px;
        margin-bottom: 30px;
        
        @media (max-width: 768px){ 
          margin: 15px auto 10px;
          height: 140px;
          max-width: 600px;
          padding: 4px;
        }
      `}
    >
      <div 
        className="InfoHeader_img_container"
        css={css`
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
          css={css`
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
          css={css`
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
            css={css`
              font-weight: 300;
              font-size: 32px;
              margin-bottom: 6px;
            `}
          >
            {userData.username}
          </h1>
          {userData.username === loggedInUserData.username 
            ? <Fragment>
                <Link to="/editprofile">
                  <button 
                    css={{
                      padding: '3px 8px', 
                      margin: '2px 20px', 
                      color: '#262626', 
                      borderRadius: '4px',
                      fontWeight: '500'
                    }}
                  >
                    Edit Profile
                  </button>
                </Link>
                <SettingsModal />
              </Fragment>
            : null
          }
        </div>
        <h3 css={{marginBottom: '4px'}}>{userData.name}</h3>
        <p>{userData.bio}</p>
      </div>
    </div>
  );
}

export default InfoHeader;