/** @jsx jsx */
import React from 'react';
import { Modal, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import { LoggedInUserContext } from '../../user-context';
import { gql, useMutation } from '@apollo/client';

const StyledButton = styled.button`
  border: 0;
  outline: 0;
`;

const StyledEllipsisOutlined = styled(EllipsisOutlined)`
  font-size: 24px;
  color: #212121;
`;

const StyledModalButton = styled(Button)`
  border: 0;
  box-shadow: none;
  margin: 10px 0;
  font-size: 21px;
  :hover {
    opacity: 0.8;
    color: #cc2366;
  }
`;

const deletePostQuery = gql`
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
    }
  }
`;

function PostOptions({postId, imgKey, userDataId}) {
  const [visible, changeVisible] = React.useState(false);
  const history = useHistory();
  const [deletePost] = useMutation(deletePostQuery);
  const { loggedInUserData, currentCredentials } = React.useContext(LoggedInUserContext);

  const showModal = () => changeVisible(true)
  const handleOk = e => changeVisible(false)
  const handleCancel = e => changeVisible(false)

  const handleDelete = async e => {
    console.log(`deleting ${postId}`);

    let deletePostInput = {
      input: {
        id: postId
      }
    }
    deletePost({variables: deletePostInput})
    changeVisible(false);
    // ill just push it to home instead
    history.push('/');
  }
  
  return (
    <div>
      <StyledButton onClick={showModal}>
        <StyledEllipsisOutlined />
      </StyledButton>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width='500px'
        closable={false}
      >
        {
          currentCredentials.authenticated &&
          (loggedInUserData.getUser.id === userDataId 
          ? <StyledModalButton 
              onClick={handleDelete}
              block 
            >
              <span css={{color: 'red'}}>Delete</span>
            </StyledModalButton>
          : null)
        }
        <StyledModalButton 
          onClick={e => console.log(imgKey)}
          block
        >
          Copy Link
        </StyledModalButton>
        <Link to={`/p/${postId}`}>
          <StyledModalButton 
            onClick={e => console.log(postId)}
            block
          >
            Go to Post
          </StyledModalButton>
        </Link>
      </Modal>
    </div>
  );   
}

export default PostOptions;