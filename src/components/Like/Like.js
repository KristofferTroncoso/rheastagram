/** @jsx jsx */
import React from 'react';
import { Icon } from 'antd';
import { API } from 'aws-amplify';
import { genUUID, getISODate } from '../../utils';
import { jsx } from '@emotion/core';

function Like({postId, likeId, loggedInUserData, arrOfLikes, getPostData, getNewArrOfLikes}) {
  const [liked, toggleLiked] = React.useState(false);
  React.useEffect(() => {
    arrOfLikes.includes(postId)
    ? toggleLiked(true)
    : toggleLiked(false);
  }, [arrOfLikes, postId]);
  
  const createLikeMutation = `
    mutation CreateLike($likeId: ID, $timeCreated: String, $likeUserId: ID, $likePostId: ID) {
      createLike(input: {
        id: $likeId
        timeCreated: $timeCreated
        likeUserId: $likeUserId
        likePostId: $likePostId
      }) {
        id
      }
    }
  `;
  
  // const deleteLikeMutation = `
  //   mutation DeleteLike($likeId: ID) {
  //     deleteLike(input: {id: $likeId}) {
  //       id
  //     }
  //   }
  // `;
  
  const createLikeVariables = {
    likeId: `likeid:${genUUID()}`,
    timeCreated: getISODate(),
    likeUserId: loggedInUserData.id,
    likePostId: postId
  }
  
  // const deleteLikeVariables = {
  //   likeId
  // }
  
  const handleToggle = async e => {
    let res = await API.graphql({query: createLikeMutation, variables: createLikeVariables});
    console.log(res);
    getNewArrOfLikes();
    getPostData(postId);
  }
  
  return (
    <button 
      onClick={handleToggle} 
      css={{border: 0, margin: 0, padding: 0}} 
      className="LikeBtn"
    >
      <Icon 
        type="heart" 
        theme={liked ? "twoTone" : null} 
        twoToneColor="red" 
        css={{fontSize: '26px', color: '#5c5c5c'}} 
      />
    </button>
  )
}

export default Like;