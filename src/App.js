/** @jsx jsx */
import React from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import MobileNavbar from './components/MobileNavbar/MobileNavbar';
import HomePage from './pages/HomePage/HomePage';
import SubmitPostPage from './pages/SubmitPostPage/SubmitPostPage';
import UserPage from './pages/UserPage/UserPage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import PostPage from './pages/PostPage/PostPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Wrapper from './components/Wrapper/Wrapper';
import { getISODate } from './utils';
import { jsx } from '@emotion/core';
import { LoggedInUserContext } from './user-context';

function App() {
  const [loggedInUserData, setLoggedInUserData] = React.useState({});
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    console.log("App-useEffect: Getting Auth Data for current logged-in user!")
    getAuthenticatedUserAndData();
  }, [isAuthenticated]);
  

  const postUser = async(identityId, username, email) => {
    const createUser = `
      mutation CreateUser(
        $input: CreateUserInput!
        $condition: ModelUserConditionInput
      ) {
        createUser(input: $input, condition: $condition) {
          id
          username
          name
          bio
          email
          photoUrl
          timeCreated
          type
        }
      }
    `;

    const createUserInput = {
      id: identityId,
      username,
      email,
      name: username,
      bio: `Hello my name is ${username} :)`,
      type: "user",
      timeCreated: getISODate()
    };
    console.log(createUserInput);
    const response = await API.graphql(graphqlOperation(createUser, {input: createUserInput}));
    console.log(response);
    getUserData(identityId);
  }
  
  const getAuthenticatedUserAndData = () => {
    Auth.currentCredentials()
    .then(res => {
      getUserData(res.identityId);
    })
    .catch(err => console.log(err))
  }
  
  const getUserData = async(identityId) => {
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
    `;

    const response = await API.graphql(graphqlOperation(customGetUserQuery, {id: identityId}));
    if (response.data.getUser === null) {
      console.log("Not found. Create new profile on database");
      Auth.currentAuthenticatedUser().then(d => {
        postUser(identityId, d.username, d.attributes.email)
      })
    } else {
      console.log('App: Found user on DynamoDB database!')
      let {bio, comments, id, likes, name, photoUrl, userPosts, username} = response.data.getUser;
      setLoggedInUserData({
        id,
        name,
        bio,
        username,
        photoUrl,
        posts: userPosts.items,
        comments: comments.items,
        likes: likes.items
      });
      setIsAuthenticated(true);
    }
  }
  
  return (
    <Router>
      <LoggedInUserContext.Provider value={{loggedInUserData, getAuthenticatedUserAndData, isAuthenticated, setIsAuthenticated}}>
        <div className="App" css={{width: '100vw'}}>
          <Navbar />
          <Wrapper>
            <Route path="/" exact render={props => <HomePage />} />
            <Route path="/user/:id" render={props => <UserPage props={props} />} />
            <Route path="/editprofile" render={props => <EditProfilePage />} />
            <Route path="/post" render={props => <SubmitPostPage />} />
            <Route path="/p/:postId" render={props => <PostPage props={props} />} />
            <Route path="/login" render={props => <LoginPage props={props} />} />
          </Wrapper>
          {window.innerWidth < 600 && <MobileNavbar /> }
        </div>        
      </LoggedInUserContext.Provider>
    </Router>
  );
}

export default App;