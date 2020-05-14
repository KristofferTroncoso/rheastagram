/** @jsx jsx */
import { css, jsx } from '@emotion/core';

function Wrapper({children}) {
  return (
    <div 
      className="Wrapper"
      css={css`
        max-width: 1000px; 
        margin: 80px auto;

        @media (max-width: 768px){ 
          margin: 60px auto 0;
          padding-bottom: 50px;
        }
      `}
    >
      {children}
    </div>
  )
}

export default Wrapper;