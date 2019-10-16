import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Modal, Icon, Button } from 'antd';
import { deletePost } from '../../graphql/mutations';
import { useHistory } from "react-router";


function PostOptions({id, imgKey, userData, loggedInUserData}) {
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
  
  const handleDelete = async e => {
    console.log(`deleting ${id}`);
    let deletePostInput = {
      id: id
    }
    const response = await API.graphql(graphqlOperation(deletePost, {input: deletePostInput}));
    console.log(response);
    changeVisible(false);
    // history.push(`/user/${loggedInUserData.username}`);
    // ill just push it to home instead
    history.push('/');
  }
  
  return (
    <div>
      <div
        onClick={showModal}
      >
        <Icon type="ellipsis" style={{fontSize: '30px', margin: '0 5px'}} />
      </div>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width='500px'
        closable={false}
      >
        {
          loggedInUserData.id === userData.id 
          ? <Button 
              onClick={handleDelete}
              block style={{border: 0, boxShadow: 'none', margin: '10px 0'}}
            >
              <h2 style={{color: 'red'}}>Delete</h2>
            </Button>
          : null
        }
        <Button 
          onClick={e => console.log(imgKey)}
          block style={{border: 0, boxShadow: 'none', margin: '10px 0'}}
        >
          <h2>Copy Link</h2>
        </Button>
      </Modal>
    </div>
  );   
}

export default PostOptions;