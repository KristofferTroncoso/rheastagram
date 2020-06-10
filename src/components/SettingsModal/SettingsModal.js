/** @jsx jsx */
import React from 'react';
import { Auth } from 'aws-amplify';
import { Modal, Icon, Button } from 'antd';
import { jsx } from '@emotion/core';
import { LoggedInUserContext } from '../../user-context';
import { useHistory } from 'react-router-dom';

function SettingsModal() {
  const { setIsAuthenticated } = React.useContext(LoggedInUserContext);
  const [visible, changeVisible] = React.useState(false);
  const history = useHistory();

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
    Auth.signOut()
      .then(d => {
        setIsAuthenticated(false);
        history.push("/");
    });
  }
  
  return (
    <div>
      <button
        onClick={showModal}
        css={{border: 0, outline: 0, padding: '8px 5px 5px'}}
      >
        <Icon type="setting" css={{fontSize: '22px'}} />
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
          block 
          css={{border: 0, boxShadow: 'none', margin: '10px 0'}}
        >
          <h2>Log Out</h2>
        </Button>
      </Modal>
    </div>
  );   
}

export default SettingsModal;