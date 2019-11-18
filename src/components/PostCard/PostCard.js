import React from 'react';
import { API, Storage, Cache } from 'aws-amplify'
import PostOptions from '../PostOptions/PostOptions';
import Avatar from '../Avatar/Avatar';
import { genUUID, getISODate } from '../../utils';
import moment from 'moment';
import Like from '../Like/Like';
import { Icon } from 'antd';
import styled from 'styled-components';

const StyledSection = styled.section`
  display: flex;
  background: inherit;
  justify-content: center;
  border-radius: 4px;
  max-width: 950px;
  margin: 0 auto;
  
  @media (max-width: 768px){ 
    flex-direction: column;
  }
`;

const StyledImgWrapper = styled.div`
  overflow: hidden;
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
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  max-height: 700px;
  object-fit: cover;
  border: 1px solid lightgrey;
`;

const StyledDiv = styled.div`
  min-width: 335px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid lightgrey;
  border-left: 0
`;

const StyledDivHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 5px;
  border-bottom: 1px solid lightgrey;
  background: white;
`;

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
    <StyledSection className="PostCard">
      <StyledImgWrapper>
        <StyledImg 
          alt="rhea" 
          src={imgKey}
          style={isImgLoaded ? null : {filter: 'blur(15px)'}}
          onLoad={e => setIsImgLoaded(true)}
        />
      </StyledImgWrapper>
      <StyledDiv>
        <StyledDivHeader>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Avatar img={userData.photoUrl}  username={userData.username} rainbow />
            <h3 style={{marginLeft: '10px'}}>{userData.username}</h3>
          </div>
          <PostOptions 
            userData={userData} 
            id={postId} 
            imgKey={imgKey} 
            loggedInUserData={loggedInUserData} 
          />
        </StyledDivHeader>
        <div 
          className="NewPic_Comments" 
          style={{padding: "8px", height: '100%', overflow: 'auto'}}
        >
          {comments
          .sort((a, b) => (a.timeCreated < b.timeCreated) 
            ? -1 
            : ((a.timeCreated > b.timeCreated) 
              ? 1 
              : 0))
          .map(comment => (
            <div style={{display: 'flex', marginBottom: '8px'}}  key={comment.id}>
              <Avatar img={comment.user.photoUrl} username={comment.user.username} />
              <div className="NewPic_CommentBox" style={{marginLeft: '10px'}}>
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                  <h4 style={{marginRight: '5px', fontSize: '12px', margin: '0 8px 0 0'}}>
                    {comment.user.username}
                  </h4>
                  <p style={{fontSize: '12px', color: '#2b2b2b', margin: 0}}>
                    {comment.content}
                  </p>
                </div>
                <p style={{fontSize: '11px', color: 'grey'}}>
                  {moment(comment.timeCreated).fromNow()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div 
          className="PostCard_stats" 
          style={{borderTop: '1px solid lightgrey', padding: '8px'}}
        >
          <div className="PostCard_stats_icons" style={{display: 'flex'}}>
            <Like 
              postId={postId} 
              loggedInUserData={loggedInUserData} 
              arrOfLikes={arrOfLikes} 
              getPostData={getPostData} 
              getNewArrOfLikes={getNewArrOfLikes} 
            />
            <Icon 
              type="message" 
              style={{fontSize: '24px', margin: '0 8px', color: '#5c5c5c'}} 
            />
          </div>
          <h4 style={{fontWeight: '700', margin: 0}}>
            {likes.length} {likes.length > 1 ? 'likes' : 'like'}
          </h4>
          <span style={{color: 'grey', fontSize: '12px'}}>
            {moment(timeCreated).format('MMMM D, YYYY')}
          </span>
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
      </StyledDiv>
    </StyledSection>    
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