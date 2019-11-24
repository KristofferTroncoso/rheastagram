import React from 'react';
import styled from 'styled-components/macro';
import Comment from '../Comment/Comment';

function CommentList({comments}) {
  return (
    <div 
      className="CommentList" 
      css={`padding: 8px; height: 100%; overflow: auto;`}
    >
      {comments
      .sort((a, b) => (a.timeCreated < b.timeCreated) 
        ? -1 
        : ((a.timeCreated > b.timeCreated) 
          ? 1 
          : 0))
      .map(comment => (
        <Comment comment={comment} />
      ))}
    </div> 
  )
}

export default CommentList;