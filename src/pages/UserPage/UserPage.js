/** @jsx jsx */
import React from 'react';
import PicGrid from '../../components/PicGrid/PicGrid';
import InfoHeader from '../../components/InfoHeader/InfoHeader';
import { API, graphqlOperation } from 'aws-amplify';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';


const StyledDiv = styled.div`
  padding: 15px 0 200px;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const StyledH1 = styled.h1`
  text-align: center;
  padding-top: 200px;
`;

function UserPage({loggedInUserData, props}) {
  const [foundUserData, changeFoundUserData] = React.useState({posts: []})
  const [isFound, changeIsFound] = React.useState(true);
  
  React.useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);
  
  
  async function getUser(x) {
    const customListUsers = `
      query customListUsers($filter: ModelUserFilterInput) {
        listUsers(filter: $filter) {
         items {
            id
            name
            username
            bio
            photoUrl
            userPosts {
              items {
                id
                picUrl
                timeCreated
                comments {
                  items {
                    id
                    content
                    user {
                      id
                      username
                      photoUrl
                    }
                    timeCreated
                  }
                }
                likes {
                  items {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `;
      
    let variables = {
      filter: {
        username: {
          eq: x
        }
      }
    };
    
    let res = await API.graphql(graphqlOperation(customListUsers, variables));
    if (res.data.listUsers.items.length > 0) {
      changeIsFound(true);
      let {id, name, username, bio, email, photoUrl, userPosts} = res.data.listUsers.items[0];
      changeFoundUserData({
        id: id,
        name: name,
        username: username,
        bio: bio,
        photoUrl: photoUrl,
        email: email,
        posts: userPosts.items
      })     
    } else {
      console.log("User does not exist");
      changeIsFound(false);
    }
  }
  
  
  return (
    <StyledDiv>
      {isFound 
      ? <>
          <InfoHeader userData={foundUserData} loggedInUserData={loggedInUserData} />
          <PicGrid 
            pics={foundUserData.posts} 
            userData={foundUserData} 
            loggedInUserData={loggedInUserData}
            getUser={getUser} 
          />
        </> 
      : <StyledH1>User not found</StyledH1>}
    </StyledDiv>
  )
}

export default UserPage;