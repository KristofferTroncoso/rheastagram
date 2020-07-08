/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { genUUID, getISODate } from '../../utils';
import { LoggedInUserContext } from '../../user-context';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

function CommentForm({postId, getPostData}) {
  const [inputText, changeInputText] = React.useState('');
  const { loggedInUserData, currentCredentials } = React.useContext(LoggedInUserContext);

  const query = gql`
    mutation CreateComment(
      $id: ID
      $content: String
      $timeCreated: String
      $userId: ID!
      $postId: ID!
      $condition: ModelCommentConditionInput
    ) {
      createComment(input: {
        id: $id
        content: $content
        timeCreated: $timeCreated
        userId: $userId
        postId: $postId
      }, condition: $condition) {
        id
        content
        timeCreated
        userId
        postId
      }
    }
  `;
  
  const [addComment] = useMutation(query);

  const handleSubmit = e => {
    e.preventDefault();

    const variables = {
      id: `commentid:${genUUID()}`,
      content: inputText,
      timeCreated: getISODate(),
      userId: loggedInUserData.getUser.id,
      postId: postId
    }
  
    addComment({variables}).then(d => getPostData()).catch(err => console.log(err))
    changeInputText('');
  }
  
  const handleChange = e => {
    changeInputText(e.target.value);
  }
  
  return (
    currentCredentials.authenticated
    ?<form 
      onSubmit={inputText ? handleSubmit : e => console.log(e)} 
      css={css`
        width: 100%; 
        display: flex;
        justify-content: space-between;
        align-items: center;

        *:focus {
          outline: none;
        }
      `}
    >
      <input 
        type="text" 
        placeholder="Add a comment..." 
        onChange={handleChange}
        value={inputText}
        id={`CommentForm_input_${postId}`}
        css={css`
          border: 0;
          border-bottom-right-radius: inherit;
          padding: 8px 5px;
          width: 100%;
          background: inherit;
          
          @media (max-width: 768px){ 
            font-size: 18px;

            ::placeholder {
              font-size: 14px;
            }
          } 
        `}
      />
      <button
        onClick={handleSubmit} 
        css={css`
          border: none;
          padding: 15px 20px;
          background: inherit;
          color: ${inputText ? 'dodgerblue' : '#8ce2ff'};
          font-weight: 500;
          font-size: 14px;

          @media (max-width: 768px){ 
            font-size: 16px;
          } 
        `}
        disabled={inputText ? false : true}
      >
        Post
      </button>
    </form>
    : <span>
        You must be <Link to="/login">logged in</Link> to comment
      </span>
  )
}

export default CommentForm;