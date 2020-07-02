import React from 'react';
import { Global, css } from '@emotion/core'

function GlobalStyles() {
  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css?family=Cookie|Lato&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
        }

        :root {
          --amplify-primary-color: salmon;
          --amplify-primary-tint: salmon;
          --amplify-primary-shade: salmon;
          --amplify-text-xxs:	0.75rem;
          --amplify-text-xs:	0.81rem;
          --amplify-text-sm:	0.875rem;
          --amplify-text-md:	1rem;
          --amplify-text-lg:	1.5rem;
          --amplify-text-xl:	2rem;
          --amplify-text-xxl:	2.5rem;
        }

        @media (max-width: 768px){ 
          :root {
            --amplify-text-sm:	1rem;
          }
        } 

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
          "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
          sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: #f7f7f7;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
          monospace;
        }

        button {
          background: inherit;
          color: inherit;
          cursor: pointer;
          border: 1px solid lightgrey;
          margin: 4px;
        }

        img {
          image-orientation: from-image;
        }

        a {
          text-decoration: none;
        }

        *,*:focus,*:hover{
          outline:none;
        }
      `}
    />
  )
}

export default GlobalStyles;
