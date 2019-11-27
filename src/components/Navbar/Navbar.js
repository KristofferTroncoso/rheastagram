/** @jsx jsx */
import { Link } from 'react-router-dom';
import { Icon, Button } from 'antd';
import Avatar from '../Avatar/Avatar';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';

const StyledDiv = styled.div`
  background: white; 
  padding: 0 25px;
  border-bottom: 1px solid #E0E0E0;
  position: fixed;
  width: 100vw;
  top: 0px;
  z-index: 1;
  @media (max-width: 768px){ 
    padding: 0 15px;
  }
`;

const StyledNav = styled.nav`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1000px;
  
  @media (max-width: 768px){ 
    height: 60px;
  }
`;

const StyledLogoAndTitle = styled.div`
  font-family: 'Cookie', cursive;
  display: flex;
  align-items: center;
`;

const StyledSpan = styled.span`
  font-family: 'Cookie', cursive;
  font-size: 34px;
  color: black;
  padding-left: 16px;

  @media (max-width: 768px){ 
    font-size: 28px;
    padding-left: 8px;
  } 
`;

const StyledIcon = styled(Icon)`
  font-size: 32px;
  color: #3b3b3b;
  border-right: 1px solid #4a4a4a;
  padding-right: 16px;
  
  @media (max-width: 768px){ 
    font-size: 28px;
    margin: 5px 0;
    padding-right: 8px;
  } 
`;

const StyledSearchForm = styled.form`
  @media (max-width: 768px){ 
    display: none;
  }
`;

const StyledSearchInput = styled.input`
  width: 200px;
  border: 1px solid #E0E0E0;
  padding: 3px 6px;
  border-radius: 2px;
  background: #fafafa;
  text-align: center;
  font-size: 13px;
  
  ::placeholder {
    color: #b1b1b1;
  }
  
  :focus {
    width: 250px;
    background: white;
    outline: none;
    text-align: left;
    transition: width 0.2s;
  }
`;

const StyledLink = styled(Link)`
  @media (max-width: 768px){ 
    display: none;
  }
`;

const StyledLogInBtn = styled.button`
  background: #039BE5;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 3px;
`;

const StyledSignUpBtn = styled.button`
  background: white;
  color: #039BE5;
  border: none;
  padding: 6px 10px;
  border-radius: 3px;
`;

const StyledPostPhotoButton = styled(Button)`
  margin: 0 10px;
  :hover {
    color: white;
    border: white;
    background: salmon;
  }
`;

function Navbar({userData}) {

  return (
    <StyledDiv className="Navbar">
      <StyledNav>
        <Link to="/">
          <StyledLogoAndTitle className="LogoAndTitle">
            <StyledIcon className="Navbar_Instagram_icon" type="instagram" />
            <StyledSpan className="Title">
              Rheastagram
            </StyledSpan>
          </StyledLogoAndTitle>
        </Link>
        <StyledSearchForm className="Search" onSubmit={e => e.preventDefault()}>
          <StyledSearchInput type="text" className="Search_Box" placeholder="Search" />
        </StyledSearchForm>
        {userData       
        ? (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <StyledLink to="/post" className="PostPhotoButton">
              <StyledPostPhotoButton>
                <Icon type="camera" />
                <span css={{margin: '0 5px'}}>Post Photo</span>
              </StyledPostPhotoButton>
            </StyledLink>
            <Avatar 
              img={userData.photoUrl} 
              username={userData.username} 
              rainbow
              large
            />
          </div>
          )
        : <div>
            <StyledLogInBtn className="LogInBtn">Log In</StyledLogInBtn>
            <StyledSignUpBtn className="SignUpBtn">Sign Up</StyledSignUpBtn>
          </div>
        }
      </StyledNav>
    </StyledDiv>
  );
}

export default Navbar;