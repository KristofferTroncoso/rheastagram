/** @jsx jsx */
import PicModal from '../PicModal/PicModal';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';

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

function PicGrid({userData}) {
  return (
    <StyledPicGridWrapper className="PicGridWrapper">
      <StyledPicGrid className="PicGrid">
        {userData.userPosts.items.map((post) => (
          <PicModal 
            key={post.id} 
            img={post.picUrl} 
            post={post} 
            hearts={post.likes.items.length}
            comments={post.comments.items.length}
          />
        ))}
      </StyledPicGrid>
    </StyledPicGridWrapper>
  );
}

export default PicGrid;