/** @jsx jsx */
import React from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { genUUID, getISODate } from '../../utils';
import { jsx } from '@emotion/core';
import { LoggedInUserContext } from '../../user-context';
import { motion } from "framer-motion";
import { gql, useMutation, useQuery } from '@apollo/client';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

const GetLikeOnPostByUserQuery = gql`
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

const createLikeMutation = gql`
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

const deleteLikeMutation = gql`
  mutation DeleteLike($likeId: ID) {
    deleteLike(input: {
      id: $likeId
    }) {
      id
    }
  }
`;

function Like({postId}) {
  const [liked, toggleLiked] = React.useState(false);
  const { loggedInUserData, currentCredentials } = React.useContext(LoggedInUserContext);
  const [currentLikeId, setCurrentLikeId] = React.useState();
  const [addLike] = useMutation(createLikeMutation);
  const [removeLike] = useMutation(deleteLikeMutation);
  const { loading, error, data, refetch } = useQuery(
    GetLikeOnPostByUserQuery, 
    {variables: {
      loggedInUserId: loggedInUserData.getUser.id,
      postId: postId
    }}
  );

  React.useEffect(() => {
    if (data) {
      if (data.getPost.likes.items.length) {
        setCurrentLikeId(data.getPost.likes.items[0].id);
        toggleLiked(true)
      } else {
        toggleLiked(false);
      }
    }
  }, [data])
  console.log(data)

  const handleToggle = async e => {
    const createLike = async () => { 
      const createLikeVariables = {
        likeId: `likeid:${genUUID()}`,
        timeCreated: getISODate(),
        userId: loggedInUserData.getUser.id,
        postId: postId
      }

      addLike({variables: createLikeVariables})
      .then(res => {
        toggleLiked(true); 
        refetch();
      })
      .catch(err => console.log(err));
    }

    const deleteLike = async () => {
      console.log(`deleting like with id ${currentLikeId}`)

      const variables = {
        likeId: currentLikeId
      }

      removeLike({variables: variables})
      .then(res => {
        toggleLiked(false); 
        refetch();
      })
      .catch(err => console.log(err));
    }

    liked ? deleteLike() : createLike();
  }

  if (!currentCredentials.authenticated) return <HeartOutlined style={{fontSize: '26px', color: '#5c5c5c'}} />;
  if (loading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;
  return (
    <button 
      onClick={handleToggle} 
      css={{border: 0, margin: 0, padding: 0}} 
      className="LikeBtn"
      disabled={currentCredentials.authenticated ? false : true}
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