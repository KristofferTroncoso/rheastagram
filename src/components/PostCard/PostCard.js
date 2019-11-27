/** @jsx jsx */
import React from 'react';
import { API, Storage, Cache } from 'aws-amplify'
import PostOptions from '../PostOptions/PostOptions';
import Avatar from '../Avatar/Avatar';
import CommentList from '../CommentList/CommentList';
import { genUUID, getISODate } from '../../utils';
import moment from 'moment';
import Like from '../Like/Like';
import { Icon } from 'antd';
import { css, jsx } from '@emotion/core';

function PostCard(
  {
    postImgUrl, 
    likes, 
    comments, 
    userData, 
    loggedInUserData, 
    postId, 
    getUser, 
    getPostData, 
    arrOfLikes, 
    timeCreated, 
    getNewArrOfLikes
  }) {
  const [imgKey, changeImgKey] = React.useState('');
  const [inputText, changeInputText] = React.useState('');
  const [isImgLoaded, setIsImgLoaded] = React.useState(false);

  React.useEffect(() => {
    let cacheRes = Cache.getItem(postImgUrl);
    if (cacheRes === null) {
      Storage.get(postImgUrl)
      .then(d => {
        changeImgKey(d);
        let dateNow = new Date();
        let expirationTime = dateNow.getTime() + 900000;
        Cache.setItem(postImgUrl, d, {expires: expirationTime });
      })
      .catch(err => console.log(err));
    } else {
      changeImgKey(cacheRes);
    }
  }, [postImgUrl])
  
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
        border-radius: 4px;
        max-width: 950px;
        margin: 0 auto;
        
        @media (max-width: 768px){ 
          flex-direction: column;
        }
      `}
    >
      <div
        css={css`
          overflow: hidden;
          border-radius: 4px 0 0 4px;
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
          border-radius: 4px;
          border: 1px solid lightgrey;
          border-left: 0;
          border-radius: inherit;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            padding: 5px;
            border-bottom: 1px solid lightgrey;
            background: white;     
            border-radius: 0 4px 0 0;
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
          css={css`border-top: 1px solid lightgrey; padding: 8px;`}
        >
          <div className="PostCard_stats_icons" css={css`display: flex;`}>
            <Like 
              postId={postId} 
              loggedInUserData={loggedInUserData} 
              arrOfLikes={arrOfLikes} 
              getPostData={getPostData} 
              getNewArrOfLikes={getNewArrOfLikes} 
            />
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
        <form onSubmit={handleSubmit} css={css`width: 100%;`}>
          <input 
            type="text" 
            placeholder="Add comment" 
            onChange={handleChange}
            value={inputText}
            css={css`
              border: 0;
              border-top: 1px solid lightgrey;
              padding: 18px 14px;
              width: 100%;
            `}
          />
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