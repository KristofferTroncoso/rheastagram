/** @jsx jsx */
import React from 'react';
import Avatar from '../Avatar/Avatar';
import { MessageOutlined, HeartOutlined } from '@ant-design/icons';
import moment from 'moment';
import PostOptions from '../PostOptions/PostOptions';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import useSignedS3Url from '../../hooks/useSignedS3Url';
import UsernameLink from '../UsernameLink/UsernameLink';
import Like from '../Like/Like';
import { LoggedInUserContext } from '../../user-context';
import { Popover } from 'antd';
import CommentForm from '../CommentForm/CommentForm';
import { gql, useQuery } from '@apollo/client';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

const StyledSection = styled.section`
  background: white;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  padding: 0;
  margin: 10px auto 50px;
  max-width: 600px;
  
  @media (max-width: 500px){
    background: inherit;
    border: 0;
    border-radius: 0;
    margin: 10px auto 15px;
  }
`;

const StyledDiv = styled.div`
  height: 60px;
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;


const StyledImg = styled.img`
  width: 100%;
  min-height: 200px;
  background: #e6e6e6;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
`;

const GetPostQuery = gql`
  query GetPost($postId: ID!, $commentsLimit: Int) {
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
      comments(limit: $commentsLimit) {
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

function HomePageCard({ postId }) {
  const { currentCredentials } = React.useContext(LoggedInUserContext);

  const { loading, error, data, refetch } = useQuery(GetPostQuery, {variables: {
    postId: postId,
    commentsLimit: 3
  }});

  const imgKey = useSignedS3Url(data && data.getPost.picUrl);
  
  if (loading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;
  return (
    <StyledSection className="wrapper">
      <StyledDiv>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div css={{marginRight: '10px'}}>
            <Avatar img={data.getPost.user.photoUrl}  username={data.getPost.user.username} size={34} rainbow />
          </div>
          <UsernameLink>{data.getPost.user.username}</UsernameLink>
        </div>
        <PostOptions 
          userDataId={data.getPost.user.id} 
          postId={data.getPost.id}
        />
      </StyledDiv>
      <div style={{overflow: 'hidden'}}>
        <StyledImg 
          src={imgKey} 
        />
      </div>
      <div>
        <div className="PostCard_stats_icons" css={css`display: flex; padding: 10px 10px 2px`}>
          {currentCredentials.isAuthenticated ? <Like postId={postId} getPostData={refetch} /> : <HeartOutlined style={{fontSize: '26px', color: '#5c5c5c'}} /> }
          <MessageOutlined 
            css={css`font-size: 24px; margin: 0 8px; color: #5c5c5c;`}
            onClick={currentCredentials.authenticated ? e => document.getElementById(`CommentForm_input_${postId}`).focus() : null}
          />
        </div>
        {data.getPost.likes.items.length > 0 &&
          <div css={css`display: flex; align-content: center; align-items: center; padding: 2px 10px`}>
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
        <div 
          className="CommentList" 
          css={css`padding: 2px 10px; height: 100%; overflow: auto;`}
        >
          {data.getPost.comments.items.map(comment => (
            <div css={css`display: flex; align-items: baseline`} key={comment.id}>
              <UsernameLink>{comment.user.username}</UsernameLink>
              <p css={css`font-size: 14px; color: #2b2b2b; margin: 0`}>
                {comment.content}
              </p>
            </div>
          ))}
        </div> 
        <span css={css`color: grey; font-size: 12px; padding: 10px;`}>
          {moment(data.getPost.timeCreated).format('MMMM D, YYYY')}
        </span>
        <div 
          css={css`
            width: 100%; 
            border-top: 1px solid #efefef;
            padding: 0 2px 0 10px;
            height: 50px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          `}
        >
          <CommentForm postId={postId} getPostData={refetch} /> 
        </div>
      </div>
    </StyledSection>
  )
}


export default HomePageCard;
