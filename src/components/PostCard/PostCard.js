/** @jsx jsx */
import React from 'react';
import { API } from 'aws-amplify'
import PostOptions from '../PostOptions/PostOptions';
import Avatar from '../Avatar/Avatar';
import { MessageOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import CommentList from '../CommentList/CommentList';
import moment from 'moment';
import Like from '../Like/Like';
import { css, jsx } from '@emotion/core';
import useSignedS3Url from '../../hooks/useSignedS3Url';
import CommentForm from '../CommentForm/CommentForm';
import UsernameLink from '../UsernameLink/UsernameLink';
import { LoggedInUserContext } from '../../user-context';

function PostCard({postId}) {
  const { isAuthenticated } = React.useContext(LoggedInUserContext);
  const [isImgLoaded, setIsImgLoaded] = React.useState(false);
  const [postData, changePostData] = React.useState({
    id: '',
    picUrl: '',
    type: '',
    visibility: '',
    timeCreated: '',
    userId: '',
    user: {},
    comments: {items: []},
    likes: {items: [{user: {id: '', photoUrl: '', username: ''}}]}
  });

  const getPostData = async (postId) => {
    const query = `
      query GetPost($postId: ID!) {
        getPost(id: $postId) {
          id
          picUrl
          type
          visibility
          timeCreated
          userId
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
                username
                photoUrl
              }
            }
          }
        }
      }
    `;
    
    const variables = {
      postId: postId
    }
    
    API.graphql({query, variables})
    .then(res => {
      changePostData(res.data.getPost);
    })
    .catch(err => console.log(err));
  }

  React.useEffect(() => {
    getPostData(postId);
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
          background: #e6e6e6;       
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
            <div css={{marginRight: '10px'}}>
              <Avatar img={postData.user.photoUrl}  username={postData.user.username} rainbow />
            </div>
            <UsernameLink>{postData.user.username}</UsernameLink>
          </div>
          <PostOptions 
            userDataId={postData.userId} 
            postId={postId} 
            imgKey={imgKey} 
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
              onClick={isAuthenticated ? e => document.getElementById(`CommentForm_input_${postId}`).focus() : null}
            />
          </div>
          {postData.likes.items.length > 0 &&
            <div css={css`display: flex; align-content: center; align-items: center; margin: 5px 0`}>
              <div css={css`margin-right: 5px`}><Avatar img={postData.likes.items[0].user.photoUrl} username={postData.likes.items[0].user.username} /></div>
              <span>
                Liked by <UsernameLink>{postData.likes.items[0].user.username}</UsernameLink>
                {postData.likes.items.length > 1 &&
                  <span>
                    and 
                    <Popover 
                      trigger="click"
                      content={
                        <div>
                          {postData.likes.items.slice(1).map(item => (
                            <span key={item.id}><UsernameLink>{item.user.username}</UsernameLink></span>
                          ))}
                        </div>
                      }
                    >
                      <span css={{fontWeight: '600', color: 'black', marginLeft: '4px', cursor: 'pointer'}}>
                        {postData.likes.items.length - 1} {postData.likes.items.length === 2 ? 'other' : 'others'}
                      </span>
                    </Popover>
                  </span>
                }
              </span>
            </div>
          }
          <span css={css`color: grey; font-size: 12px;`}>
            {moment(postData.timeCreated).format('MMMM D, YYYY')}
          </span>
        </div>
        <div 
          css={css`
            width: 100%; 
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom-right-radius: inherit;
            border-top: 1px solid #efefef;
            height: 100px;
            padding: 0 2px 0 10px;
          `}
        >
          <CommentForm postId={postId} getPostData={getPostData} /> 
        </div>
      </div>
    </section>    
  )
}

export default PostCard;