/** @jsx jsx */
import React from 'react';
import { API } from 'aws-amplify';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { genUUID, getISODate } from '../../utils';
import { jsx } from '@emotion/core';
import { LoggedInUserContext } from '../../user-context';
import { motion } from "framer-motion";

function Like({postId, getPostData}) {
  const [liked, toggleLiked] = React.useState(false);
  const { loggedInUserData } = React.useContext(LoggedInUserContext);
  const [currentLikeId, setCurrentLikeId] = React.useState();
  
  React.useEffect(() => {
    const GetLikeOnPostByUserQuery = `
      query GetLikeOnPostByUser($postId: ID!, $loggedInUserId: ID!) {
        getPost(id: $postId) {
          likes(filter: {userId: {eq: $loggedInUserId} }) {
            items {
              id
            }
          }
        }
      }
    `;
    
    const variables = {
      loggedInUserId: loggedInUserData.id,
      postId: postId
    }

    API.graphql({query: GetLikeOnPostByUserQuery, variables})
    .then(res => {
      if (res.data.getPost.likes.items.length) {
        setCurrentLikeId(res.data.getPost.likes.items[0].id);
        toggleLiked(true)
      } else {
        toggleLiked(false);
      }
    });
  }, [loggedInUserData, postId, liked])


  const handleToggle = async e => {
    const createLike = async () => {
      const createLikeMutation = `
        mutation CreateLike($likeId: ID, $timeCreated: String, $userId: ID!, $postId: ID!) {
          createLike(input: {
            id: $likeId
            timeCreated: $timeCreated
            userId: $userId
            postId: $postId
          }) {
            id
          }
        }
      `;
      
      const createLikeVariables = {
        likeId: `likeid:${genUUID()}`,
        timeCreated: getISODate(),
        userId: loggedInUserData.id,
        postId: postId
      }

      API.graphql({query: createLikeMutation, variables: createLikeVariables})
      .then(res => {toggleLiked(true); getPostData(postId);})
      .catch(err => console.log(err));
    }

    const deleteLike = async () => {
      console.log(`deleting like with id ${currentLikeId}`)
      const deleteLikeMutation = `
        mutation DeleteLike($likeId: ID) {
          deleteLike(input: {
            id: $likeId
          }) {
            id
          }
        }
      `;
      
      const variables = {
        likeId: currentLikeId
      }

      API.graphql({query: deleteLikeMutation, variables: variables})
      .then(res => {toggleLiked(false); getPostData(postId);})
      .catch(err => console.log(err));
    }

    liked ? deleteLike() : createLike();
  }
  
  return (
    <button 
      onClick={handleToggle} 
      css={{border: 0, margin: 0, padding: 0}} 
      className="LikeBtn"
    >
      <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 1.2 }}>
        {liked
        ? <HeartFilled style={{fontSize: '26px', color: 'rgb(237, 73, 86)'}} />
        : <HeartOutlined style={{fontSize: '26px', color: '#5c5c5c'}} />
        }
      </motion.div>
    </button>
  )
}

export default Like;