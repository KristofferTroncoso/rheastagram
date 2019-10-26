import React from 'react';
import './PostCard.css';
import { API, Storage } from 'aws-amplify'
import PostOptions from '../PostOptions/PostOptions';
import Avatar from '../Avatar/Avatar';
import { genUUID, getISODate } from '../../utils';
import moment from 'moment';
import Like from '../Like/Like';
import { Icon } from 'antd';


function PostCard({postImgUrl, likes, comments, userData, loggedInUserData, postId, getUser, getPostData, arrOfLikes, timeCreated, getNewArrOfLikes}) {
  const [imgKey, changeImgKey] = React.useState('');
  const [inputText, changeInputText] = React.useState('');
  
  React.useEffect(() => {
    Storage.get(postImgUrl).then(d => changeImgKey(d)).catch(err => console.log(err));
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
    <div 
      className="PostCard" 
      style={{display: 'flex', background: 'lightgrey', justifyContent: 'center', borderRadius: '4px', maxWidth: '850px'}}
    >
      <img alt="rhea" src={imgKey} style={{maxWidth: '700px', maxHeight: '800px', objectFit: 'cover', border: '1px solid lightgrey'}} />
      <div 
        style={{
          minWidth: '320px', 
          background: 'white', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          borderRadius: '4px', 
          border: '1px solid lightgrey',
          borderLeft: 0
        }}
      >
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
          <PostOptions userData={userData} id={postId} imgKey={imgKey} loggedInUserData={loggedInUserData} />
        </div>
        <div className="NewPic_Comments" style={{padding: "8px", height: '100%', overflow: 'auto'}}>
          {comments
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
        <div className="PostCard_stats" style={{borderTop: '1px solid lightgrey', padding: '8px'}}>
          <div className="PostCard_stats_icons" style={{display: 'flex'}}>
            <Like postId={postId} loggedInUserData={loggedInUserData} arrOfLikes={arrOfLikes} getPostData={getPostData} getNewArrOfLikes={getNewArrOfLikes} />
            <Icon type="message" style={{fontSize: '24px', margin: '0 8px', color: '#5c5c5c'}} />
          </div>
          <h4 style={{fontWeight: '700', margin: 0}}>{likes.length} {likes.length > 1 ? 'likes' : 'like'}</h4>
          <span style={{color: 'grey', fontSize: '12px'}}>{moment(timeCreated).format('MMMM D, YYYY')}</span>
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