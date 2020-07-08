/** @jsx jsx */
import React from 'react';
import PostOptions from '../PostOptions/PostOptions';
import Avatar from '../Avatar/Avatar';
import { MessageOutlined, HeartOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import CommentList from '../CommentList/CommentList';
import moment from 'moment';
import Like from '../Like/Like';
import { css, jsx } from '@emotion/core';
import useSignedS3Url from '../../hooks/useSignedS3Url';
import CommentForm from '../CommentForm/CommentForm';
import UsernameLink from '../UsernameLink/UsernameLink';
import { LoggedInUserContext } from '../../user-context';
import { gql, useQuery } from '@apollo/client';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

function PostCard({postId}) {
  const { currentCredentials } = React.useContext(LoggedInUserContext);
  const [isImgLoaded, setIsImgLoaded] = React.useState(false);

  const query = gql`
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

  const { loading, error, data, refetch } = useQuery(query, {variables: {postId}});
  const imgKey = useSignedS3Url(data && data.getPost.picUrl)
  
  if (loading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;
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
              <Avatar img={data.getPost.user.photoUrl}  username={data.getPost.user.username} rainbow />
            </div>
            <UsernameLink>{data.getPost.user.username}</UsernameLink>
          </div>
          <PostOptions 
            userDataId={data.getPost.userId} 
            postId={postId} 
            imgKey={imgKey} 
          />
        </div>
        <CommentList comments={data.getPost.comments.items} />
        <div 
          className="PostCard_stats" 
          css={css`border-top: 1px solid #efefef; padding: 12px;`}
        >
          <div className="PostCard_stats_icons" css={css`display: flex;`}>
            {currentCredentials.isAuthenticated ? <Like postId={postId} /> : <HeartOutlined style={{fontSize: '26px', color: '#5c5c5c'}} /> }
            <MessageOutlined 
              css={css`font-size: 24px; margin: 0 8px; color: #5c5c5c;`}
              onClick={currentCredentials.authenticated ? e => document.getElementById(`CommentForm_input_${postId}`).focus() : null}
            />
          </div>
          {data.getPost.likes.items.length > 0 &&
            <div css={css`display: flex; align-content: center; align-items: center; margin: 5px 0`}>
              <div css={css`margin-right: 5px`}>
                <Avatar img={data.getPost.likes.items[0].user.photoUrl} username={data.getPost.likes.items[0].user.username} size="small" />
              </div>
              <span>
                Liked by <UsernameLink>{data.getPost.likes.items[0].user.username}</UsernameLink>
                {data.getPost.likes.items.length > 1 &&
                  <span>
                    and 
                    <Popover 
                      trigger="click"
                      content={
                        <div>
                          {data.getPost.likes.items.slice(1).map(item => (
                            <span key={item.id}><UsernameLink>{item.user.username}</UsernameLink></span>
                          ))}
                        </div>
                      }
                    >
                      <span css={{fontWeight: '600', color: 'black', marginLeft: '4px', cursor: 'pointer'}}>
                        {data.getPost.likes.items.length - 1} {data.getPost.likes.items.length === 2 ? 'other' : 'others'}
                      </span>
                    </Popover>
                  </span>
                }
              </span>
            </div>
          }
          <span css={css`color: grey; font-size: 12px;`}>
            {moment(data.getPost.timeCreated).format('MMMM D, YYYY')}
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
          <CommentForm postId={postId} getPostData={refetch} /> 
        </div>
      </div>
    </section>    
  )
}

export default PostCard;