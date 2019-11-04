/* eslint-disable */
import React from 'react';
import { Auth, Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator, Authenticator, SignIn, ForgotPassword } from 'aws-amplify-react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import customTheme from './customTheme';
import Navbar from './components/Navbar/Navbar';
import MobileNavbar from './components/MobileNavbar/MobileNavbar';
import HomePage from './pages/HomePage/HomePage';
import PublicPage from './pages/PublicPage/PublicPage';
import PostPhotoPage from './pages/PostPhotoPage/PostPhotoPage';
import UserPage from './pages/UserPage/UserPage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import PostPage from './pages/PostPage/PostPage';
import { listUsers, getUser } from './graphql/queries';
import { createUser } from './graphql/mutations';
import { genUUID } from './utils';

const customGetUserQuery = `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      name
      bio
      email
      photoUrl
      userPosts {
        items {
          id
          picUrl
          timeCreated
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
        nextToken
      }
      comments {
        items {
          id
          content
          timeCreated
        }
        nextToken
      }
      likes {
        items {
          id
          post {
            id
          }
        }
        nextToken
      }
    }
  }
`

function App() {
  const [userData, changeUserData] = React.useState({
    id: null,
    name: '',
    profilePhotoUrl: null,
    posts: [],
    comments: [],
    likes: [],
    bio: ''
  });
  const [arrOfLikes, changeArrOfLikes] = React.useState([]);

  React.useEffect(() => {
    console.log("App-useEffect: Getting Auth Data for current logged-in user!")
    getAuthenticatedUserAndData();
  }, []);
  

  const postUser = async(identityId, username, email) => {
    const createUserInput = {
      id: identityId,
      username,
      email,
      name: username,
      bio: `Hello my name is ${username} :)`,
    };
    console.log(createUserInput);
    const response = await API.graphql(graphqlOperation(createUser, {input: createUserInput}));
    getUserData(identityId);
  }
  
  const getAuthenticatedUserAndData = () => {
    Auth.currentCredentials()
    .then(res => {
      getUserData(res.data.IdentityId);
    })
    .catch(err => console.log(err))
  }
  
  const getUserData = async(identityId) => {
    const response = await API.graphql(graphqlOperation(customGetUserQuery, {id: identityId}));
    if (response.data.getUser === null) {
      console.log("Not found. Create new profile on database");
      Auth.currentAuthenticatedUser().then(d => {
        postUser(identityId, d.username, d.attributes.email)
      })

    } else {
      console.log('App: Found user on DynamoDB database!')
      let {bio, comments, id, likes, name, photoUrl, userPosts, username} = response.data.getUser;
      changeUserData({
        id,
        name,
        bio,
        username,
        profilePhotoUrl: photoUrl,
        posts: userPosts.items,
        comments: comments.items,
        likes: likes.items
      })
    }
  }
  
  const testfunc = () => console.log('testing!')

  const list = async(identityId) => {
    // console.log('calling api');
    // const response = await API.get(myApi, `/items/postid:456`);
    // console.log(response);
    console.log('listing');
  }
  
  const handleTest = async e => {
    let endpointUrl = "https://l2p5qjd4f5dlrig4il3zkkgqre.appsync-api.us-east-1.amazonaws.com/graphql";
    const getUserTestQuery = `
      query GetUserTest($id:ID!) {
        getUser(id: $id) {
          id username
        }
      }
    `
    const queryVariables = {
      id: "us-east-1:94d08666-8d6a-46cb-aa70-68c1fc6adf05"
    }
    let test = {query: getUserTestQuery, variables: queryVariables};
    console.log(graphqlOperation)
    const response = await API.graphql(test);
    console.log(response)
    // fetch(endpointUrl, {method: "POST"}).then(r => console.log(r));
  }

  

  return (
    <Router>
      <div className="App">
        <Navbar userData={userData} />
        <Route 
          path="/" 
          exact 
          render={props => 
            <HomePage 
              username={userData.name} 
              post={postUser} 
              getUserData={getUserData} 
              userData={userData} 
              list={list} 
            />
          } 
        />
        <Route path="/public" render={props => <PublicPage userData={userData} />} />
        <Route path="/user/:id" render={props => <UserPage loggedInUserData={userData} props={props} />} />
        <Route path="/editprofile" render={props => <EditProfilePage userData={userData} getAuthenticatedUserAndData={getAuthenticatedUserAndData} />} />
        <Route path="/post" render={props => <PostPhotoPage userData={userData} />} />
        <Route path="/p/:postId" render={props => <PostPage props={props} loggedInUserData={userData} />} />
        {window.innerWidth < 600 && <MobileNavbar userData={userData} /> }
      </div>
    </Router>
  );
}


export default withAuthenticator(App, false, [], null, customTheme);
