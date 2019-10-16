import React from 'react';
import { Link } from 'react-router-dom';
import './Avatar.css';
import { Avatar as AntAvatar } from 'antd';
import { Storage } from 'aws-amplify';

function Avatar({img, username}) {
  const [imgKey, changeImgKey] = React.useState('');
  
  React.useEffect(() => {
    Storage.get(img).then(d => changeImgKey(d)).catch(err => console.log(err));
  }, [img])
  
  return (
    <Link to={`/user/${username}`}>
      <div className="AvatarIcon">
        <AntAvatar 
          style={{width: '40px', height: '40px', border: '2px solid white'}} 
          icon="user" 
          src={imgKey && imgKey} 
        />
      
        {/*
        <div 
          className="AvatarIcon_img" 
          style={{
            backgroundImage: `url(${img})`, 
            backgroundPosition: 'center', 
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }} 
        />
        */}
      </div>
    </Link>
  )
}

export default Avatar;
