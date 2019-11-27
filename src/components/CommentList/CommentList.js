/** @jsx jsx */
import Comment from '../Comment/Comment';
import { jsx, css } from '@emotion/core';

function CommentList({comments}) {
  return (
    <div 
      className="CommentList" 
      css={css`padding: 8px; height: 100%; overflow: auto;`}
    >
      {comments
      .sort((a, b) => (a.timeCreated < b.timeCreated) 
        ? -1 
        : ((a.timeCreated > b.timeCreated) 
          ? 1 
          : 0))
      .map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div> 
  )
}

export default CommentList;