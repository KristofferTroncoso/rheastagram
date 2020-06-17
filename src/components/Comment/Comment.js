/** @jsx jsx */
import moment from 'moment';
import Avatar from '../Avatar/Avatar';
import { jsx, css } from '@emotion/core';
import UsernameLink from '../UsernameLink/UsernameLink';

function Comment({comment}) {
  return (
    <div css={css`display: flex; margin-bottom: 8px; padding: 4px 2px;`}>
      <Avatar img={comment.user.photoUrl} username={comment.user.username} />
      <div className="PicModal_CommentBox" css={css`margin-left: 10px`}>
        <div css={css`display: flex; align-items: baseline`}>
          <UsernameLink>{comment.user.username}</UsernameLink>
          <p css={css`font-size: 14px; color: #2b2b2b; margin: 0`}>
            {comment.content}
          </p>
        </div>
        <p css={css`font-size: 11px; color: grey; margin: 5px 0;`}>
          {moment(comment.timeCreated).fromNow()}
        </p>
      </div>
    </div>    
  )
}

export default Comment;