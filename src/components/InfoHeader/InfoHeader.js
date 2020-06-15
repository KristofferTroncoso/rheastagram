/** @jsx jsx */
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SettingsModal from '../SettingsModal/SettingsModal';
import { jsx, css } from '@emotion/core';
import useSignedS3Url from '../../hooks/useSignedS3Url';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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
      <div css={{margin: '0 40px'}}>
        <Avatar 
          src={imgKey}
          alt={imgKey}
          icon={
            <UserOutlined 
              css={css`
                height: 100%;
                width: 100%;
               
                svg {
                  height: 60%; 
                  width: 60%; 
                  margin: 20%;
                }
              `} 
            />
          } 
          css={css`
            border: 1px solid lightgrey;
            width: 150px;
            height: 150px;

            @media (max-width: 768px){ 
              height: 80px;
              width: 80px;
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