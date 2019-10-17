import React from 'react';
import Avatar from '../Avatar/Avatar';
import { Icon } from 'antd';
import { Storage } from 'aws-amplify';
import moment from 'moment';
import PostOptions from '../PostOptions/PostOptions';

function FoodCard({ id, imgUrl, likes, hearts, userData, createdAt, loggedInUserData}) {
  const [imgKey, changeImgKey] = React.useState('');
  
  React.useEffect(() => {
    Storage.get(imgUrl).then(d => changeImgKey(d)).catch(err => console.log(err));
  }, [imgUrl])
  
  return (
    <div 
      style={{
        background: 'white', 
        border: '1px solid #e6e6e6',
        borderRadius: '3px',
        padding: '0', 
        margin: '10px auto', 
        maxWidth: '600px'
        
      }}
      className="wrapper"
    >
      <div 
        style={{
          height: '60px', 
          padding: '5px 15px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          alignContent: 'center'
        }}
      >
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Avatar img={userData.photoUrl}  username={userData.username} />
          <h3 style={{padding: '0 15px'}}>{userData.username}</h3>
        </div>
        <PostOptions userData={userData} id={id} imgKey={imgKey} loggedInUserData={loggedInUserData} />
      </div>
      <img src={imgKey} alt={imgUrl} style={{width: '100%'}} />
      <div style={{padding: '15px'}}>
        <Icon type="heart" theme={true ? null : "twoTone"} twoToneColor="salmon" style={{fontSize: '26px', margin: '0 8px', color: '#5c5c5c'}} />
        <Icon type="message" style={{fontSize: '24px', margin: '0 8px', color: '#5c5c5c'}} />
        <Icon type="upload" style={{fontSize: '24px', margin: '0 8px', color: '#5c5c5c'}} />
        <p style={{color: 'grey', fontSize: '11px', margin: '12px 10px 6px'}}>{moment(createdAt).fromNow().toUpperCase()}</p>
      </div>
    </div>
  )
}


export default FoodCard;
