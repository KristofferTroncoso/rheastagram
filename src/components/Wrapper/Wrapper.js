import React from 'react';
import styled from 'styled-components/macro';

function Wrapper({children}) {
  return (
    <div 
      css={`
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