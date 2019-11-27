/** @jsx jsx */
import { css, jsx } from '@emotion/core';

function Wrapper({children}) {
  return (
    <div 
      css={css`
        max-width: 1000px; 
        margin: 80px auto;

        @media (max-width: 768px){ 
          margin: 60px auto;
        }
      `}
    >
      {children}
    </div>
  )
}

export default Wrapper;