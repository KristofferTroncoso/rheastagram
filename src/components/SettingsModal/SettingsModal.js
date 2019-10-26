import React from 'react';
import { Auth } from 'aws-amplify';
import { Modal, Icon, Button } from 'antd';
import './SettingsModal.css';


function SettingsModal() {
  const [visible, changeVisible] = React.useState(false);

  const showModal = () => {
    changeVisible(true)
  };

  const handleOk = e => {
    changeVisible(false);
  };
  
  const handleCancel = e => {
    changeVisible(false);
  };
  
  const handleLogOut = e => {
    Auth.signOut().then(d => console.log(d))
  }
  
  return (
    <div>
      <button
        onClick={showModal}
        style={{border: 0, outline: 0}}
      >
        <Icon type="setting" style={{fontSize: '30px', margin: '0 5px'}} />
      </button>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width='500px'
        closable={true}
      >
        <Button 
          onClick={handleLogOut}
          block style={{border: 0, boxShadow: 'none', margin: '10px 0'}}
        >
          <h2>Log Out</h2>
        </Button>
      </Modal>
    </div>
  );   
}

export default SettingsModal;