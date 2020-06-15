import React from 'react';
import PicGrid from '../../components/PicGrid/PicGrid';
import InfoHeader from '../../components/InfoHeader/InfoHeader';
import { API, graphqlOperation } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { LoggedInUserContext } from '../../user-context';


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

const StyledBtnDiv = styled.div`
  text-align: center;
`;

function UserPage({props}) {
  const [foundUserData, changeFoundUserData] = React.useState({posts: []})
  const [isFound, changeIsFound] = React.useState(true);
  const { loggedInUserData } = React.useContext(LoggedInUserContext);
  
  React.useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);
  
  
  async function getUser(username) {
    /* listUsers query is being used instead of getUser since we have to search
    for the user via username instead of uuid */
    const listUsersQuery = `
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
      
    let queryVariables = {
      filter: {
        username: {
          eq: username
        }
      }
    };
    
    let res = await API.graphql(graphqlOperation(listUsersQuery, queryVariables));
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
          {foundUserData.posts.length > 0 
          ? <PicGrid 
              pics={foundUserData.posts} 
              userData={foundUserData} 
              loggedInUserData={loggedInUserData}
              getUser={getUser} 
            />
          : <Link to="/post">
              <Button 
                style={{
                  height: '200px', 
                  width: '200px', 
                  display: 'flex',
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  margin: '10px 20px'
                }}
                type="dashed"
              >
                <PictureOutlined style={{fontSize: '120px'}} />
                Upload your first photo!
              </Button>            
            </Link>
          }
        </> 
      : <>
          <StyledH1>User not found</StyledH1>
          <StyledBtnDiv>
            <Link to={"/"}>
              <Button type="primary">Go home</Button>
            </Link>
          </StyledBtnDiv>
        </>
      }
    </StyledDiv>
  )
}

export default UserPage;