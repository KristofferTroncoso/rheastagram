import React from 'react';
import NewPic from '../NewPic/NewPic';
import styled from 'styled-components';

const StyledPicGridWrapper = styled.div`
  margin: 0 10px;
  
  @media (max-width: 735px){ 
    margin: 2px;
  }
`;

const StyledPicGrid = styled.div`
  margin: 0 auto;
  max-width: 935px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 28px;

  @media (max-width: 735px){ 
    grid-gap: 4px;
  }
`;

function PicGrid({pics, modalStatus, userData, loggedInUserData, getUser}) {
  let sortedPics = pics.sort((a, b) => (a.timeCreated < b.timeCreated) ? -1 : ((a.timeCreated > b.timeCreated) ? 1 : 0)).reverse();
  
  return (
    <StyledPicGridWrapper className="PicGridWrapper">
      <StyledPicGrid className="PicGrid">
        {sortedPics.map((pic) => (
          <NewPic 
            key={pic.id} 
            postId={pic.id}
            img={pic.picUrl} 
            post={pic} 
            userData={userData} 
            loggedInUserData={loggedInUserData} 
            hearts={pic.likes.items.length}
            comments={pic.comments.items.length}j
            getUser={getUser}
          />
        ))}
      </StyledPicGrid>
    </StyledPicGridWrapper>
  );
}

export default PicGrid;