import React from 'react';
import PicGrid from '../components/PicGrid/PicGrid';
import InfoHeader from '../components/InfoHeader/InfoHeader';
import { API, graphqlOperation } from 'aws-amplify';


function UserPage({loggedInUserData, props}) {
  const [foundUserData, changeFoundUserData] = React.useState({posts: []})
  const [isFound, changeIsFound] = React.useState();
  
  React.useEffect(() => {
    console.log(`UserPage-useEffect: Getting user data for this page!`);
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
    console.log(res);
    if (res.data.listUsers.items.length > 0) {
      changeIsFound(true);
      let {id, name, username, bio, email, photoUrl, userPosts} = res.data.listUsers.items[0];
      changeFoundUserData({
        id: id,
        name: name,
        username: username,
        bio: bio,
        profilePhotoUrl: photoUrl,
        email: email,
        posts: userPosts.items
      })     
    } else {
      console.log("User does not exist");
      changeIsFound(false);
    }
  }
  
  
  return (
    <div style={{padding: "20px 0"}}>
      {isFound 
      ? <>
          <InfoHeader userData={foundUserData} loggedInUserData={loggedInUserData} />
          <PicGrid pics={foundUserData.posts} userData={foundUserData} loggedInUserData={loggedInUserData} getUser={getUser} />
        </> 
      : <h1 style={{textAlign: 'center', paddingTop: '200px'}}>User not found</h1>}
    </div>
  )
}

export default UserPage;