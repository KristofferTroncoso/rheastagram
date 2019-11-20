import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar as AntAvatar } from 'antd';
import { Storage, Cache } from 'aws-amplify';
import styled from 'styled-components/macro';

function Avatar({img, username, large, rainbow}) {
  const [imgKey, changeImgKey] = React.useState();
  
  React.useEffect(() => {
    console.log('avatar: useeffect');
    if (img === undefined) {
      console.log('undefined')
    } else {
      console.log(`checking for ${img}`);
      let cacheRes = Cache.getItem(img);
      if (cacheRes === null) {
        console.log('getting new signedUrl')
        Storage.get(img)
        .then(d => {
          changeImgKey(d);
          let dateNow = new Date();
          let expirationTime = dateNow.getTime() + 900000;
          Cache.setItem(img, d, {expires: expirationTime });
        })
        .catch(err => console.log(err));
      } else {
        console.log('img is cached')
        changeImgKey(cacheRes);
      }
    }
  }, [img])
  
  return (
    <Link to={`/user/${username}`}>
      <div 
        className="AvatarIcon" 
        rainbow={rainbow}
        css={`
          ${props => props.rainbow
            ? `background: #f09433; 
              background: -moz-linear-gradient(45deg, #f0ab33 0%, #e68e3c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
              background: -webkit-linear-gradient(45deg, #f0ab33 0%,#e68e3c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
              background: linear-gradient(45deg, #f0ab33 0%,#e68e3c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); `
            : `background: none;`
          }
          padding: ${props => props.rainbow ? "2px" : "0"};
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          align-content: center;
        `}
      >
        <AntAvatar 
          icon="user" 
          src={imgKey && imgKey} 
          size={large ? "large" : "default"}
          rainbow={rainbow}
          css={`
            border: ${props => props.rainbow ? "2px solid white" : "1px solid lightgrey"};
          `}
        />
      </div>
    </Link>
  )
}


export default Avatar;
