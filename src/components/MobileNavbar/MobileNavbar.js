/** @jsx jsx */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlusSquare, FaRegPlusSquare, FaUser, FaRegUser } from 'react-icons/fa';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import { LoggedInUserContext } from '../../user-context';

const StyledNav = styled.nav`
  background: white;
  height: 50px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 0 10px;
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;


function MobileNavbar() {
  const [currentPage, changeCurrentPage] = React.useState();
  const { loggedInUserData } = React.useContext(LoggedInUserContext);
  
  return (
    <StyledNav className="MobileNavbar">
      <NavLink 
        exact
        to="/"
        isActive={(match, location) => {
          if (match) {
            changeCurrentPage('home')
          } else {
            return null
          }
        }}
        style={{padding: '4px 40px'}}
      >
        {currentPage === 'home'
          ? <AiFillHome css={{fontSize: '34px', color: '#3b3b3b'}} />
          : <AiOutlineHome css={{fontSize: '34px', color: '#3b3b3b'}} />
        }
      </NavLink>
      <NavLink 
        to="/post" 
        isActive={(match, location) => {
          if (match) {
            changeCurrentPage('post')
          } else {
            return null
          }
        }}
        style={{padding: '0 40px'}}
      >
        {currentPage === 'post'
          ? <FaPlusSquare css={{fontSize: '38px', color: '#3b3b3b'}} />
          : <FaRegPlusSquare css={{fontSize: '38px', color: '#3b3b3b'}} />
        }
      </NavLink>
      <NavLink 
        to={`/user/${loggedInUserData.username}`}
        isActive={(match, location) => {
          if (match) {
            changeCurrentPage('user')
          } else {
            return null
          }
        }}
        css={{padding: '4px 40px'}}
      >
        {currentPage === 'user'
          ? <FaUser css={{fontSize: '30px', color: '#3b3b3b'}} />
          : <FaRegUser css={{fontSize: '30px', color: '#3b3b3b'}} />
        }
      </NavLink>
    </StyledNav>
  )
}

export default MobileNavbar;