/** @jsx jsx */
import React from 'react';
import { API } from 'aws-amplify'
import PostOptions from '../PostOptions/PostOptions';
import Avatar from '../Avatar/Avatar';
import CommentList from '../CommentList/CommentList';
import { genUUID, getISODate } from '../../utils';
import moment from 'moment';
import Like from '../Like/Like';
import { Icon } from 'antd';
import { css, jsx } from '@emotion/core';
import useSignedS3Url from '../../hooks/useSignedS3Url';

function PostCard(
  {
    postImgUrl, 
    likes, 
    comments, 
    userData, 
    loggedInUserData, 
    postId, 
    getPostData,  
    timeCreated, 
  }) {
  const [inputText, changeInputText] = React.useState('');
  const [isImgLoaded, setIsImgLoaded] = React.useState(false);

  const imgKey = useSignedS3Url(postImgUrl);
  
  const handleSubmit = e => {
    e.preventDefault();
    const query = `
      mutation CreateComment(
        $id: ID
        $content: String
        $timeCreated: String
        $userId: ID!
        $postId: ID!
        $condition: ModelCommentConditionInput
      ) {
        createComment(input: {
          id: $id
          content: $content
          timeCreated: $timeCreated
          userId: $userId
          postId: $postId
        }, condition: $condition) {
          id
          content
          timeCreated
          userId
          postId
        }
      }
    `;

    const variables = {
      id: `commentid:${genUUID()}`,
      content: inputText,
      timeCreated: getISODate(),
      userId: loggedInUserData.id,
      postId: postId
    }
  
    
    API.graphql({query, variables})
    .then(res => {
      console.log(res);
      getPostData(postId);
    })
    .catch(err => console.log(err));
    changeInputText('');
  }
  
  const handleChange = e => {
    changeInputText(e.target.value);
  }
  
  return (
    <section 
      className="PostCard"
      css={css`
        display: flex;
        background: inherit;
        justify-content: center;
        max-width: 950px;
        margin: 0 auto;
        border-radius: 7px 4px 4px 7px;
        
        @media (max-width: 768px){ 
          flex-direction: column;
          border-radius: 0;
        }
      `}
    >
      <div
        css={css`
          overflow: hidden;
          border-top-left-radius: inherit;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: inherit;
          background: orange;
          background-image: radial-gradient(
              closest-corner circle at 30% 70%,
              steelblue 30%,
              rgb(207, 84, 84),
              90%,
              transparent
            ),
            radial-gradient(
              closest-corner circle at 90% 40%,
              pink 20%,
              orange,
              90%,
              transparent
            ),
            radial-gradient(
              closest-corner circle at 30% 10%,
              tomato 15%,
              green,
              85%,
              transparent
            );        
        `}
      >
        <img 
          alt="rhea" 
          src={imgKey}
          style={isImgLoaded ? null : {filter: 'blur(15px)'}}
          onLoad={e => setIsImgLoaded(true)}
          css={css`
            width: 100%;
            height: 100%;
            max-height: 700px;
            object-fit: cover;
            border: 1px solid lightgrey;
          `}
        />
      </div>
      <div
        css={css`
          min-width: 335px;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid lightgrey;
          border-left: 0;
          border-top-left-radius: 0;
          border-top-right-radius: inherit;
          border-bottom-right-radius: inherit;
          border-bottom-left-radius: 0;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 10px;
            border-bottom: 1px solid lightgrey;
            background: white;  
            border-top-right-radius: inherit;   
          `}
        >
          <div css={css`display: flex; align-items: center;`}>
            <Avatar img={userData.photoUrl}  username={userData.username} rainbow />
            <h3 css={css`margin: 0 0 0 10px;`}>{userData.username}</h3>
          </div>
          <PostOptions 
            userData={userData} 
            id={postId} 
            imgKey={imgKey} 
            loggedInUserData={loggedInUserData} 
          />
        </div>
        <CommentList comments={comments} />
        <div 
          className="PostCard_stats" 
          css={css`border-top: 1px solid lightgrey; padding: 12px;`}
        >
          <div className="PostCard_stats_icons" css={css`display: flex;`}>
            <Like postId={postId} />
            <Icon 
              type="message" 
              css={css`font-size: 24px; margin: 0 8px; color: #5c5c5c;`}
            />
          </div>
          <h4 css={css`font-weight: 700; margin: 0`}>
            {likes.length} {likes.length > 1 ? 'likes' : 'like'}
          </h4>
          <span css={css`color: grey; font-size: 12px;`}>
            {moment(timeCreated).format('MMMM D, YYYY')}
          </span>
        </div>
        <form 
          onSubmit={inputText ? handleSubmit : e => console.log(e)} 
          css={css`
            width: 100%; 
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom-right-radius: inherit;
            border-top: 1px solid lightgrey;
            *:focus {
              outline: none;
            }
          `}
        >
          <input 
            type="text" 
            placeholder="Add a comment..." 
            onChange={handleChange}
            value={inputText}
            css={css`
              border: 0;
              border-bottom-right-radius: inherit;
              padding: 18px 14px;
              width: 100%;
            `}
          />
          <button
            onClick={handleSubmit} 
            css={css`
              border: none;
              padding: 15px 20px;
              background: inherit;
              color: ${inputText ? 'dodgerblue' : '#8ce2ff'};
              font-weight: 500;
              font-size: 14px;
            `}
            disabled={inputText ? false : true}
          >
            Post
          </button>
        </form>
      </div>
    </section>    
  )
}


PostCard.defaultProps = {
  postImgUrl: '',
  likes: [],
  comments: [], 
  userData: {
    username: "Unknown"
  },
  loggedInUserData: {}, 
  postId: ''
};

export default PostCard;