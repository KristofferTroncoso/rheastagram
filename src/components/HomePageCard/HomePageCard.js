/** @jsx jsx */
import React from 'react';
import Avatar from '../Avatar/Avatar';
import { API } from 'aws-amplify';
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
  filter: ${props => props.isImgLoaded ? 'none' : 'blur(10px)'};
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
`;

function HomePageCard({ postId }) {
  const { currentCredentials } = React.useContext(LoggedInUserContext);
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
  const imgKey = useSignedS3Url(postData.picUrl);

  const getPostData = async (postId) => {
    const query = `
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
    
    const variables = {
      postId: postId,
      commentsLimit: 3
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
  
  return (
    <StyledSection className="wrapper">
      <StyledDiv>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div css={{marginRight: '10px'}}>
            <Avatar img={postData.user.photoUrl}  username={postData.user.username} size={34} rainbow />
          </div>
          <UsernameLink>{postData.user.username}</UsernameLink>
        </div>
        <PostOptions 
          userDataId={postData.user.id} 
          postId={postData.id}
        />
      </StyledDiv>
      <div style={{overflow: 'hidden'}}>
        <StyledImg 
          src={imgKey} 
          alt={isImgLoaded ? imgKey : null} 
          onLoad={e => setIsImgLoaded(true)} 
          isImgLoaded={isImgLoaded}
        />
      </div>
      <div>
        <div className="PostCard_stats_icons" css={css`display: flex; padding: 10px 10px 2px`}>
          {currentCredentials.isAuthenticated ? <Like postId={postId} getPostData={getPostData} /> : <HeartOutlined style={{fontSize: '26px', color: '#5c5c5c'}} /> }
          <MessageOutlined 
            css={css`font-size: 24px; margin: 0 8px; color: #5c5c5c;`}
            onClick={currentCredentials.authenticated ? e => document.getElementById(`CommentForm_input_${postId}`).focus() : null}
          />
        </div>
        {postData.likes.items.length > 0 &&
          <div css={css`display: flex; align-content: center; align-items: center; padding: 2px 10px`}>
            <div css={css`margin-right: 5px`}>
              <Avatar img={postData.likes.items[0].user.photoUrl} username={postData.likes.items[0].user.username} size="small" />
            </div>
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
        <div 
          className="CommentList" 
          css={css`padding: 2px 10px; height: 100%; overflow: auto;`}
        >
          {postData.comments.items.map(comment => (
            <div css={css`display: flex; align-items: baseline`} key={comment.id}>
              <UsernameLink>{comment.user.username}</UsernameLink>
              <p css={css`font-size: 14px; color: #2b2b2b; margin: 0`}>
                {comment.content}
              </p>
            </div>
          ))}
        </div> 
        <span css={css`color: grey; font-size: 12px; padding: 10px;`}>
          {moment(postData.timeCreated).format('MMMM D, YYYY')}
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
          <CommentForm postId={postId} getPostData={getPostData} /> 
        </div>
      </div>
    </StyledSection>
  )
}


export default HomePageCard;
