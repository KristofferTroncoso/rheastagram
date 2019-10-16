import React from 'react';
import { Drawer, Button, Icon } from 'antd';
import PostPhotoForm from '../PostPhotoForm/PostPhotoForm';

function PostPhotoButton({userData}) {
  const [isVisible, changeIsVisible] = React.useState(false);
  
  const showDrawer = () => {
    changeIsVisible(true)
  };

  const onClose = () => {
    changeIsVisible(false)
  };

  return (
    <div>
      <Button 
        onClick={showDrawer} 
        style={{
          margin: '0 10px'
        }}
      >
        <Icon type="camera" />
        <span style={{margin: '0 5px'}}>Post Photo</span>
      </Button>
      <Drawer
        title="Post Photo"
        placement="right"
        width="600"
        closable={false}
        onClose={onClose}
        visible={isVisible}
      >
        <PostPhotoForm userData={userData} />
      </Drawer>
    </div>
  );
}


export default PostPhotoButton;