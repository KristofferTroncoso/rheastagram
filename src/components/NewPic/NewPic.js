import React from 'react';
import { Modal, Icon } from 'antd';
import { API, Storage, Cache } from 'aws-amplify'
import PostOptions from '../PostOptions/PostOptions';
import Avatar from '../Avatar/Avatar';
import { genUUID, getISODate } from '../../utils';
import moment from 'moment';
import styled from 'styled-components/macro';

function NewPic({img, hearts, comments, post, userData, loggedInUserData, postId, getUser}) {
  const [visible, changeVisible] = React.useState(false);
  const [imgKey, changeImgKey] = React.useState('');
  const [inputText, changeInputText] = React.useState('');

  React.useEffect(() => {
    let cacheRes = Cache.getItem(img);
    if (cacheRes === null) {
      Storage.get(img)
      .then(d => {
        changeImgKey(d);
        let dateNow = new Date();
        let expirationTime = dateNow.getTime() + 900000;
        Cache.setItem(img, d, {expires: expirationTime });
      })
      .catch(err => console.log(err));
    } else {
      changeImgKey(cacheRes);
    }
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
  
  const handleSubmit = e => {
    e.preventDefault();
    
    const query = `
      mutation CreateComment(
        $id: ID!
        $content: String
        $timeCreated: String
        $commentUserId: ID
        $commentPostId: ID
      ) {
        createComment(input: {
          id: $id
          content: $content
          timeCreated: $timeCreated
          commentUserId: $commentUserId
          commentPostId: $commentPostId
        }) {
          id
        }
      }
    `
    const variables = {
      id: `commentid:${genUUID()}`,
      content: inputText,
      timeCreated: getISODate(),
      commentUserId: loggedInUserData.id,
      commentPostId: postId
    }
    
    API.graphql({query, variables})
    .then(res => {
      console.log(res);
      getUser(userData.username);
    })
    .catch(err => console.log(err));
    changeInputText('');
  }
  
  const handleChange = e => {
    changeInputText(e.target.value);
  }
  

  return (
    <div className="NewPic" css={`
      display: block;
      height: 31vw;
      max-height: 288px;
    `}>
      <div className="Pic" 
        style={{
          background: `url(${imgKey}) no-repeat center/cover`,
        }}
        css={`
          height: 100%;
          width: 100%;
        `}
        onClick={showModal}
      >
        <h2 css={`
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
        `}>
          <span css={`margin: 0 5px`}><Icon type="heart" theme="filled" css={`padding: 0 5px`} />{hearts}</span> 
          <span css={`margin: 0 5px`}><Icon type="message" theme="filled" css={`padding: 0 5px`} />{comments}</span>
        </h2>
      </div>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        bodyStyle={{padding: 0}}
        closable={false}
        width="900px"
        height="900px"
      >
        <div className="NewPicCard" 
          css={`
            display: flex;
            background: white;
            justify-content: space-between;
            
            @media (max-width: 768px) { 
              flex-direction: column;
            }
          `}
        >
          <img 
            alt={imgKey} 
            src={imgKey} 
            style={{maxWidth: '700px', minHeight: '100px', maxHeight: '800px', objectFit: 'contain', background: '#f7f7f7'}} 
            css={`
              @media (max-width: 768px) { 
                width: 100%;
              }
            `}
          />
          <div style={{minWidth: '320px', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div
              style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                height: '60px', 
                padding: '5px',
                borderBottom: '1px solid lightgrey',
                background: 'white'
              }}
            >
              <div 
                style={{
                  display: 'flex', 
                  alignItems: 'center', 
                }}
              >
                <Avatar img={userData.photoUrl}  username={userData.username} />
                <h3 style={{marginLeft: '10px'}}>{userData.username}</h3>
              </div>
              <PostOptions userData={userData} id={post.id} imgKey={img} loggedInUserData={loggedInUserData} />
            </div>
            <div className="NewPic_Comments" style={{padding: "8px", height: '100%'}}>
              {post.comments.items
              .sort((a, b) => (a.timeCreated < b.timeCreated) ? -1 : ((a.timeCreated > b.timeCreated) ? 1 : 0))
              .map(comment => (
                <div style={{display: 'flex', marginBottom: '8px'}}  key={comment.id}>
                  <Avatar img={comment.user.photoUrl} username={comment.user.username} />
                  <div className="NewPic_CommentBox" style={{marginLeft: '10px'}}>
                    <div style={{display: 'flex', alignItems: 'baseline'}}>
                      <h4 style={{marginRight: '5px', fontSize: '12px', margin: '0 8px 0 0'}}>{comment.user.username}</h4>
                      <p style={{fontSize: '12px', color: '#2b2b2b', margin: 0}}>{comment.content}</p>
                    </div>
                    <p style={{fontSize: '11px', color: 'grey'}}>{moment(comment.timeCreated).fromNow()}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} style={{width: '100%'}}>
              <input 
                type="text" 
                placeholder="Add comment" 
                onChange={handleChange}
                value={inputText}
                style={{
                  border: 0,
                  borderTop: '1px solid lightgrey',
                  padding: '18px 14px',
                  width: '100%'
                }}
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );   
}

export default NewPic;