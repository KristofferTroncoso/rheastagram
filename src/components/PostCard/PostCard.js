/** @jsx jsx */
import React from 'react';
import { API } from 'aws-amplify'
import PostOptions from '../PostOptions/PostOptions';
import Avatar from '../Avatar/Avatar';
import { MessageOutlined } from '@ant-design/icons';
import CommentList from '../CommentList/CommentList';
import moment from 'moment';
import Like from '../Like/Like';
import { css, jsx } from '@emotion/core';
import useSignedS3Url from '../../hooks/useSignedS3Url';
import { LoggedInUserContext } from '../../user-context';
import CommentForm from '../CommentForm/CommentForm';

function PostCard({postId}) {
  const { loggedInUserData } = React.useContext(LoggedInUserContext);
  const [findPostState, changeFindPostState] = React.useState('loading');
  const [isImgLoaded, setIsImgLoaded] = React.useState(false);
  const [postData, changePostData] = React.useState({
    id: '',
    picUrl: '',
    timeCreated: '',
    user: {},
    comments: {items: []},
    likes: {items: []}
  });

  const getPostData = async (postId) => {
    const query = `
      query GetPost($postId: ID!) {
        getPost(id: $postId) {
          id
          picUrl
          timeCreated
          user {
            id
            username
            photoUrl
          }
          comments {
            items {
              id
              content
              timeCreated
              user {
                id
                photoUrl
                username
              }
            }
          }
          likes {
            items {
              id
              user {
                id
              }
            }
          }
        }
      }
    `;
    
    const variables = {
      postId: postId
    }
    
    console.log("Getting post data.");

    const res = await API.graphql({query, variables});
    if (res.data.getPost) {
      changePostData(res.data.getPost);
      return 'found';
    } else {
      return 'notfound';
    }
  }

  React.useEffect(() => {
    getPostData(postId)
      .then(d => changeFindPostState(d));
  }, [postId]);

  const imgKey = useSignedS3Url(postData.picUrl);
  

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
            min-height: 400px;
            min-width: 400px;
            max-height: 700px;
            object-fit: cover;
            border: 1px solid #dedede;

            @media (max-width: 768px){ 
              border: none;
            } 
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
          border: 1px solid #dedede;
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
            border-bottom: 1px solid #efefef;
            background: white;  
            border-top-right-radius: inherit;   
          `}
        >
          <div css={css`display: flex; align-items: center;`}>
            <Avatar img={postData.user.photoUrl}  username={postData.user.username} rainbow />
            <h3 css={css`margin: 0 0 0 10px;`}>{postData.user.username}</h3>
          </div>
          <PostOptions 
            userData={loggedInUserData} 
            id={postId} 
            imgKey={imgKey} 
            loggedInUserData={loggedInUserData} 
          />
        </div>
        <CommentList comments={postData.comments.items} />
        <div 
          className="PostCard_stats" 
          css={css`border-top: 1px solid #efefef; padding: 12px;`}
        >
          <div className="PostCard_stats_icons" css={css`display: flex;`}>
            <Like postId={postId} getPostData={getPostData} />
            <MessageOutlined 
              css={css`font-size: 24px; margin: 0 8px; color: #5c5c5c;`}
            />
          </div>
          <h4 css={css`font-weight: 700; margin: 0`}>
            {postData.likes.items.length} {postData.likes.items.length > 1 ? 'likes' : 'like'}
          </h4>
          <span css={css`color: grey; font-size: 12px;`}>
            {moment(postData.timeCreated).format('MMMM D, YYYY')}
          </span>
        </div>
        <CommentForm postId={postId} getPostData={getPostData} /> 
      </div>
    </section>    
  )
}

export default PostCard;