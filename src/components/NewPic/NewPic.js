import React from 'react';
import './NewPic.css';
import { Modal, Icon } from 'antd';
import { Storage } from 'aws-amplify'
import PostOptions from '../PostOptions/PostOptions';
import Avatar from '../Avatar/Avatar';


function NewPic({img, hearts, comments, post, userData, loggedInUserData}) {

  const [visible, changeVisible] = React.useState(false);
  const [imgKey, changeImgKey] = React.useState('');
  
  React.useEffect(() => {
    Storage.get(img).then(d => changeImgKey(d)).catch(err => console.log(err));
  }, [img])

  const showModal = () => {
    changeVisible(true)
  };

  const handleOk = e => {
    changeVisible(false);
  };
  
  const handleCancel = e => {
    changeVisible(false);
  };
  
  return (
    <div className="NewPic">
      <div className="Pic" 
        style={{
          background: `url(${imgKey}) no-repeat center/cover`,
        }}
        onClick={showModal}
      >
        <h2>
          <span><Icon type="heart" theme="filled" />{hearts}</span> 
          <span><Icon type="message" theme="filled" />{comments}</span>
        </h2>
      </div>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width='1000px'
        bodyStyle={{padding: 0}}
        closable={false}
      >
        <div style={{display: 'flex'}}>
          <img alt={imgKey} src={imgKey} style={{width: '100%', objectFit: 'contain'}} />
          <div 
            style={{
              width: '400px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              height: '60px', 
              padding: '5px',
              borderBottom: '1px solid lightgrey'
            }}
          >
            <div 
              style={{
                display: 'flex', 
                alignItems: 'center', 
              }}
            >
              <Avatar img={userData.profilePhotoUrl}  username={userData.username} />
              <h3 style={{marginLeft: '10px'}}>{userData.username}</h3>
            </div>
            <PostOptions userData={userData} id={post.id} imgKey={img} loggedInUserData={loggedInUserData} />
          </div>
        </div>
      </Modal>
    </div>
  );   
}

export default NewPic;