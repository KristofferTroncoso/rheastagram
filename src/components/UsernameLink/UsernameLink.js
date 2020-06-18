/** @jsx jsx */
//import React from 'react';
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';

function UsernameLink({children, ...props}) {
  return (
    <h2 css={css`margin: 0 5px 0 0px; font-weight: 600; font-size: 14px; display: inline`} {...props}>
      <Link style={{color: '#1f1f1f'}} to={`/user/${children}`}>
        {children}
      </Link>
    </h2>
  )
}

export default UsernameLink;