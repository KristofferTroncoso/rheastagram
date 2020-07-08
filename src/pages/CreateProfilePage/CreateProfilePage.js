import React from 'react';
import { Redirect } from 'react-router-dom';
import { getISODate } from './utils';

//make sure to redirect to homepage or editprofile if the profile already exists.

const createUserQuery = gql`
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      bio
      username
      photoUrl
      type
      email
      userPosts {
        items {
          id
        }
      }
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
`;

function CreateProfilePage({props}) {

  return (
    
    <div>

    </div>
  )
}

export default CreateProfilePage;

  // const fetchLoggedInUserData = () => {
  //   Auth.currentCredentials()
  //   .then(res => {
  //     API.graphql(graphqlOperation(customGetUserQuery, {id: res.identityId}))
  //     .then(response => {
  //       if (response.data.getUser === null) {
  //         console.log("Not found. Create new profile on database");
  //         Auth.currentAuthenticatedUser()
  //         .then(d => {
  //           const variables = {
  //             id: res.identityId,
  //             username: d.username,
  //             email: d.attributes.email,
  //             name: d.username,
  //             bio: `Hello my name is ${d.username} and Rhea is awesome`,
  //             type: "user",
  //             timeCreated: getISODate()
  //           };
  //           console.log('youre authenticated. trying to create record on db')
  //           API.graphql(graphqlOperation(createUserQuery, {input: variables}))
  //           .then(res => {
  //             console.log(res);
  //             let {bio, comments, id, likes, name, photoUrl, userPosts, username, type, email} = res.data.createUser;
  //             setLoggedInUserData({
  //               id,
  //               name,
  //               bio,
  //               username,
  //               photoUrl,
  //               type,
  //               email,
  //               posts: userPosts.items,
  //               comments: comments.items,
  //               likes: likes.items
  //             });
  //           })
  //           .catch(err => console.log(err));
  //         })
  //       } else {
  //         console.log('App: Found user on DynamoDB database!')
  //         let {bio, comments, id, likes, name, photoUrl, userPosts, username, type, email} = response.data.getUser;
  //         setLoggedInUserData({
  //           id,
  //           name,
  //           bio,
  //           username,
  //           photoUrl,
  //           type,
  //           email,
  //           posts: userPosts.items,
  //           comments: comments.items,
  //           likes: likes.items
  //         });
  //         setIsAuthenticated(true);
  //       }
  //     })
  //     .catch(err => console.log(err))
  //   })
  //   .catch(err => {
  //     setIsAuthenticated(false);
  //   })
  // }