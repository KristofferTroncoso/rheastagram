/** @jsx jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar as AntAvatar } from 'antd';
import { Storage, Cache } from 'aws-amplify';
import { jsx } from '@emotion/core';

function Avatar({img, username, large, rainbow}) {
  const [imgKey, changeImgKey] = React.useState();
  
  React.useEffect(() => {
    console.log('avatar: useeffect');
    if (!img) {
      console.log('undefined')
    } else {
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
        css={[
          rainbow 
          ? {
              background: [
                '#f09433',
                '-moz-linear-gradient(45deg, #f0ab33 0%, #e68e3c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                '-webkit-linear-gradient(45deg, #f0ab33 0%,#e68e3c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                'linear-gradient(45deg, #f0ab33 0%,#e68e3c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
              ],
              padding: '2px',
            }
          : {
              background: 'none',
              padding: 0
            }
          ,{
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
          }
        ]}
      >
        <AntAvatar 
          icon="user" 
          src={imgKey && imgKey} 
          size={large ? "large" : "default"}
          rainbow={rainbow}
          css={rainbow ? {border: '2px solid white'} : {border: '1px solid lightgrey'}}
        />
      </div>
    </Link>
  )
}


export default Avatar;
