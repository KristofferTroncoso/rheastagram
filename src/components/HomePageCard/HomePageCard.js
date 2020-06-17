/** @jsx jsx */
import React from 'react';
import Avatar from '../Avatar/Avatar';
import { MessageOutlined, UploadOutlined, HeartOutlined } from '@ant-design/icons';
import moment from 'moment';
import PostOptions from '../PostOptions/PostOptions';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import useSignedS3Url from '../../hooks/useSignedS3Url';
import UsernameLink from '../UsernameLink/UsernameLink';

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

const StyledTimestamp = styled.p`
  color: grey;
  font-size: 11px;
  margin: 12px 10px 6px;
`;

const StyledHeartOutlined = styled(HeartOutlined)`
  font-size: 24px;
  margin: 0 8px;
  color: #5c5c5c;
`;

const StyledMessageOutlined = styled(MessageOutlined)`
  font-size: 24px;
  margin: 0 8px;
  color: #5c5c5c;
`;

const StyledUploadOutlined = styled(UploadOutlined)`
  font-size: 24px;
  margin: 0 8px;
  color: #5c5c5c;
`;

const StyledImg = styled.img`
  width: 100%;
  min-height: 200px;
  background: #3A1C71;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71); 
  background: linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71); 
  filter: ${props => props.isImgLoaded ? 'none' : 'blur(10px)'};
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
`;

function HomePageCard({ id, imgUrl, likes, hearts, userData, createdAt }) {
  const imgKey = useSignedS3Url(imgUrl);
  const [isImgLoaded, setIsImgLoaded] = React.useState(false);

  const handleLike = e => {
    console.log(`Liking post ${id}`);
  }
  
  return (
    <StyledSection className="wrapper">
      <StyledDiv>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div css={{marginRight: '10px'}}>
            <Avatar img={userData.photoUrl}  username={userData.username} rainbow large />
          </div>
          <UsernameLink>{userData.username}</UsernameLink>
        </div>
        <PostOptions 
          userData={userData} 
          postId={id}
        />
      </StyledDiv>
      <div style={{overflow: 'hidden'}}>
        <StyledImg 
          src={imgKey} 
          alt={isImgLoaded ? imgUrl : null} 
          onLoad={e => setIsImgLoaded(true)} 
          isImgLoaded={isImgLoaded}
        />
      </div>
      <div style={{padding: '15px'}}>
        <button onClick={handleLike} style={{border: 0, padding: 0, outline: 0}}>
          <StyledHeartOutlined />
        </button>
        <StyledMessageOutlined />
        <StyledUploadOutlined />
        <StyledTimestamp>{moment(createdAt).fromNow().toUpperCase()}</StyledTimestamp>
      </div>
    </StyledSection>
  )
}


export default HomePageCard;
