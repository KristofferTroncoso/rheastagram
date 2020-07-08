/** @jsx jsx */
import PostCard from '../../components/PostCard/PostCard';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';

const StyledDiv = styled.div`
  padding: 50px 0 0;
  margin: 0 auto;
  max-width: 1000px;
  
  @media (max-width: 768px){ 
    padding: 0;
  }
`;

function PostPage({props}) {
  const paramsPostId = props.match.params.postId;

  return (
    <StyledDiv className="PostPage">
      <PostCard postId={paramsPostId} />
    </StyledDiv>
  )
}

export default PostPage;