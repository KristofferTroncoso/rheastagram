import React from 'react';
import moment from 'moment';
import styled from 'styled-components/macro';
import Avatar from '../Avatar/Avatar';

function Comment({comment}) {
  return (
    <div css={`display: flex; margin-bottom: 8px;`}>
      <Avatar img={comment.user.photoUrl} username={comment.user.username} />
      <div className="NewPic_CommentBox" css={`margin-left: 10px`}>
        <div css={`display: flex; align-items: baseline`}>
          <h4 css={`margin-right: 5px; font-size: 12px; margin: 0 8px 0 0;`}>
            {comment.user.username}
          </h4>
          <p css={`font-size: 12px; color: #2b2b2b; margin: 0`}>
            {comment.content}
          </p>
        </div>
        <p css={`font-size: 11px; color: grey`}>
          {moment(comment.timeCreated).fromNow()}
        </p>
      </div>
    </div>    
  )
}

export default Comment;