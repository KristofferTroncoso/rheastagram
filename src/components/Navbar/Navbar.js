/** @jsx jsx */
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';
import { CameraOutlined, HomeOutlined } from '@ant-design/icons';
import { FaDog } from 'react-icons/fa'
import { LoggedInUserContext } from '../../user-context';

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
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 975px;
  
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
  font-size: 32px;
  color: #2e2e2e;
  padding-left: 12px;
  padding-top: 6px;

  @media (max-width: 768px){ 
    font-size: 28px;
    padding-left: 8px;
  } 
`;

const StyledFaDog = styled(FaDog)`
  font-size: 32px;
  color: #2e2e2e;
  padding-right: 10px;
  
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
  width: 215px;
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

function Navbar() {
  const { loggedInUserData, currentCredentials } = useContext(LoggedInUserContext);

  return (
    <StyledDiv className="Navbar">
      <StyledNav>
        <Link to="/">
          <StyledLogoAndTitle className="LogoAndTitle">
            <StyledFaDog />
            <StyledSpan className="Title">
              Rheastagram
            </StyledSpan>
          </StyledLogoAndTitle>
        </Link>
        <StyledSearchForm className="Search" onSubmit={e => e.preventDefault()}>
          <StyledSearchInput type="text" className="Search_Box" placeholder="Search" />
        </StyledSearchForm>
        {currentCredentials.authenticated
        ? (
          <div css={{display: 'flex', alignItems: 'center', marginRight: '20px'}}>
            <div 
              css={css`
                display: flex;
                align-items: center;
                margin-right: 10px;

                @media (max-width: 768px){ 
                  display: none;
                }
              `}
            >
              <Link to="/" style={{padding: '5px 10px', margin: '0 5px'}}>
                <HomeOutlined style={{color: '#2e2e2e', fontSize: '21px', paddingTop: '6px'}} />
              </Link>
              <Link to="/post" style={{padding: '5px 10px', margin: '0 5px'}} className="PostPhotoButton">
                <CameraOutlined style={{color: '#2e2e2e', fontSize: '23px', paddingTop: '8px'}} />
              </Link>
            </div>
            <Avatar 
              img={loggedInUserData.getUser.photoUrl} 
              username={loggedInUserData.getUser.username} 
            />
          </div>
          )
        : <div>
            <Link to="/login"><StyledLogInBtn className="LogInBtn">Log In</StyledLogInBtn></Link>
            <Link to="/login"><StyledSignUpBtn className="SignUpBtn">Sign Up</StyledSignUpBtn></Link>
          </div>
        }
      </StyledNav>
    </StyledDiv>
  );
}

export default Navbar;