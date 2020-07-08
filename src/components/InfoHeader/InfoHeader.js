/** @jsx jsx */
import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SettingsModal from '../SettingsModal/SettingsModal';
import { jsx, css } from '@emotion/core';
import useSignedS3Url from '../../hooks/useSignedS3Url';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { LoggedInUserContext } from '../../user-context';

function InfoHeader({userData}) {
  const imgKey = useSignedS3Url(userData.photoUrl);
  const { loggedInUserData, currentCredentials } = React.useContext(LoggedInUserContext);
  
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
        css={css`
          margin: 0 40px 0 10px;

          @media (max-width: 768px){ 
            margin: 0 10px;
          }
        `}
      >
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
              height: 70px;
              width: 70px;
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
          {currentCredentials.authenticated ? 
            (userData.username === loggedInUserData.getUser.username 
              ? <Fragment>
                  <Link to="/editprofile">
                    <button 
                      css={css`
                        padding: 3px 8px;
                        margin: 2px 20px;
                        color: #262626;
                        border-radius: 4px;
                        font-weight: 500;

                        @media (max-width: 768px){ 
                          padding: 1px 3px;
                          margin: 2px 6px;
                        }
                      `}
                    >
                      Edit Profile
                    </button>
                  </Link>
                  <SettingsModal />
                </Fragment>
              : null
            ) : null
          }
        </div>
        <h3 css={{marginBottom: '4px'}}>{userData.name}</h3>
        <p>{userData.bio}</p>
      </div>
    </div>
  );
}

export default InfoHeader;