import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar as AntAvatar } from 'antd';
import { Storage, Cache } from 'aws-amplify';
import styled from 'styled-components';

const StyledDiv = styled.div`
  ${props => props.rainbow
    ? `background: #f09433; 
      background: -moz-linear-gradient(45deg, #f0ab33 0%, #e68e3c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
      background: -webkit-linear-gradient(45deg, #f0ab33 0%,#e68e3c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
      background: linear-gradient(45deg, #f0ab33 0%,#e68e3c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); `
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
  border: ${props => props.rainbow ? "2px solid white" : "1px solid lightgrey"};
`;

function Avatar({img, username, large, rainbow}) {
  const [imgKey, changeImgKey] = React.useState();
  
  React.useEffect(() => {
    let cacheRes = Cache.getItem(img);
    if (cacheRes === null) {
      Storage.get(img)
      .then(d => {
        changeImgKey(d);
        let dateNow = new Date();
        let expirationTime = dateNow.getTime() + 3600000;
        Cache.setItem(img, d, {expires: expirationTime });
      })
      .catch(err => console.log(err));
    } else {
      changeImgKey(cacheRes);
    }
  }, [img])
  
  return (
    <Link to={`/user/${username}`}>
      <StyledDiv className="AvatarIcon" rainbow={rainbow}>
        <StyledAntAvatar 
          icon="user" 
          src={imgKey && imgKey} 
          size={large ? "large" : "default"}
          rainbow={rainbow}
        />
      </StyledDiv>
    </Link>
  )
}


export default Avatar;
