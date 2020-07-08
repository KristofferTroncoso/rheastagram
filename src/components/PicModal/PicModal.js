/** @jsx jsx */
import React from 'react';
import { Modal } from 'antd';
import { HeartFilled, MessageFilled } from '@ant-design/icons';
import { css, jsx } from '@emotion/core';
import useSignedS3Url from '../../hooks/useSignedS3Url';
import PostCard from '../PostCard/PostCard';
import { CloseSquareTwoTone } from '@ant-design/icons';

function PicModal({img, hearts, comments, post}) {
  const [visible, changeVisible] = React.useState(false);

  const imgKey = useSignedS3Url(img);

  const showModal = () => changeVisible(true);
  const handleCancel = () => changeVisible(false);
  
  return (
    <div 
      className="PicModal" 
      css={css`
        display: block;
        height: 31vw;
        max-height: 288px;
      `}
    >
      <div className="Pic" 
        style={{
          background: `url(${imgKey}) no-repeat center/cover`,
        }}
        css={css`
          height: 100%;
          width: 100%;
        `}
        onClick={showModal}
      >
        <h2 
          css={css`
            color: white;
            background: rgba(0, 0, 0, 0.5);
            opacity: 0;
            margin: 0;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            
            :hover {
              opacity: 1;
            }
          `}
        >
          <span css={css`margin: 0 5px`}><HeartFilled css={css`padding: 0 5px`} />{hearts}</span> 
          <span css={css`margin: 0 5px`}><MessageFilled css={css`padding: 0 5px`} />{comments}</span>
        </h2>
      </div>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        forceRender={true}
        footer={false}
        bodyStyle={{padding: 0}}
        closable={window.innerWidth < 600 && true}
        style={window.innerWidth < 600 && {top: 0}}
        closeIcon={<CloseSquareTwoTone style={{fontSize: '30px'}} twoToneColor="blue" />}
        width="900px"
      >
        <PostCard postId={post.id} />
      </Modal>
    </div>
  );   
}

export default PicModal;