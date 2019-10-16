import React from 'react';
import PicGrid from '../components/PicGrid/PicGrid';
import InfoHeader from '../components/InfoHeader/InfoHeader';
import { API, graphqlOperation } from 'aws-amplify';

const customListUsers = `query customListUsers($filter: ModelUserFilterInput) {
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
}`;


function UserPage({loggedInUserData, props}) {
  const [foundUserData, changeFoundUserData] = React.useState({posts: []})
  
  let paramsId = props.match.params.id;
  
  React.useEffect(() => {
    console.log(`UserPage-useEffect: Getting user data for ${paramsId}!`);
    getUser(paramsId)
  }, [paramsId]);
  

  async function getUser(x) {
    let query = {
      filter: {
        username: {
          eq: x
        }
      }
    };
    
    let res = await API.graphql(graphqlOperation(customListUsers, query));
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
  }
  
  
  return (
    <div>
      <InfoHeader userData={foundUserData} loggedInUserData={loggedInUserData} />
      <PicGrid pics={foundUserData.posts} userData={foundUserData} loggedInUserData={loggedInUserData} />
    </div>
  )
}

export default UserPage;