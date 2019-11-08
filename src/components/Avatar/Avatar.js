import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar as AntAvatar } from 'antd';
import { Storage } from 'aws-amplify';
import styled from 'styled-components';

// const StyledDiv = styled.div`
//   background: #ec008c; 
//   background: -webkit-linear-gradient(to right, #ffc852, #ec008c); 
//   background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
//             linear-gradient(127deg, rgba(255,255,0,.8), rgba(255,255,0,0) 70.71%),
//             linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
//   padding: 2px;
//   height: 44px;
//   width: 44px;
//   border-radius: 50%;
// `;

// const StyledAntAvatar = styled(AntAvatar)`
//   width: 40px;
//   height: 40px;
//   border: 2px solid white;
// `;

const StyledDiv = styled.div`
  ${props => props.rainbow
    ? `background: #ec008c; 
      background: -webkit-linear-gradient(to right, #ffc852, #ec008c); 
      background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
              linear-gradient(127deg, rgba(255,255,0,.8), rgba(255,255,0,0) 70.71%),
              linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);`
    : `background: none;`
  }
  padding: ${props => props.rainbow ? "2px" : "0"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const StyledAntAvatar = styled(AntAvatar)`
  border: 2px solid white;
`;

function Avatar({img, username, large, rainbow}) {
  const [imgKey, changeImgKey] = React.useState();
  
  React.useEffect(() => {
    console.log('Avatar:useEffect')
    Storage.get(img).then(d => changeImgKey(d)).catch(err => console.log(err));
  }, [img])
  
  return (
    <Link to={`/user/${username}`}>
      <StyledDiv className="AvatarIcon" rainbow={rainbow}>
        <StyledAntAvatar 
          icon="user" 
          src={imgKey && imgKey} 
          size={large ? "large" : "default"}
        />
      </StyledDiv>
    </Link>
  )
}


export default Avatar;
