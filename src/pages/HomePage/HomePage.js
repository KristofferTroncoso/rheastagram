import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import FoodCard from '../../components/FoodCard/FoodCard';
import styled from 'styled-components';

const StyledDiv = styled.div`
  padding: 80px 0;
  
  @media (max-width: 768px){ 
    padding: 60px 0;
  }
`;



const listPosts = `query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        picUrl
        user {
          id
          username
          name
          bio
          email
          photoUrl
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        timeCreated
      }
      nextToken
    }
  }
`;

const variables = {
  limit: 12
}

const HomePage = ({ userData }) => {
  React.useEffect(() => {
    getAllPosts();
  },[])
  
  const [allPosts, changeAllPosts] = React.useState([])
  
  const getAllPosts = async() => {
    let response = await API.graphql(graphqlOperation(listPosts, variables));
    let sortedPosts = response.data.listPosts.items.sort((a, b) => (a.timeCreated < b.timeCreated) ? -1 : ((a.timeCreated > b.timeCreated) ? 1 : 0)).reverse();
    changeAllPosts(sortedPosts);
  }
  
  return (
    <StyledDiv className="HomePage wrapper">
      {allPosts.map(post => (
        <FoodCard 
          key={post.id} 
          id={post.id} 
          imgUrl={post.picUrl} 
          createdAt={post.timeCreated} 
          blurb={post.blurb} 
          userData={post.user} 
          loggedInUserData={userData}
        />
      ))}
    </StyledDiv>
  )
}

export default HomePage;
