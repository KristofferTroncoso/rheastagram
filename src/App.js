/** @jsx jsx */
import React from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  const [loggedInUserData, setLoggedInUserData] = React.useState({});
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    console.log("App-useEffect: Getting Auth Data for current logged-in user!")
    getAuthenticatedUserAndData();
  }, [isAuthenticated]);
  
  const getAuthenticatedUserAndData = () => {
    Auth.currentCredentials()
    .then(res => {
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

      API.graphql(graphqlOperation(customGetUserQuery, {id: res.identityId}))
      .then(response => {
        if (response.data.getUser === null) {
          console.log("Not found. Create new profile on database");
          Auth.currentAuthenticatedUser()
          .then(d => {
            const query = `
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
        
            const variables = {
              id: res.identityId,
              username: d.username,
              email: d.attributes.email,
              name: d.username,
              bio: `Hello my name is ${d.username} and Rhea is awesome`,
              type: "user",
              timeCreated: getISODate()
            };
            console.log('youre authenticated. trying to create record on db')
            API.graphql(graphqlOperation(query, {input: variables}))
            .then(res => {
              console.log(res);
              let {bio, comments, id, likes, name, photoUrl, userPosts, username, type, email} = res.data.createUser;
              setLoggedInUserData({
                id,
                name,
                bio,
                username,
                photoUrl,
                type,
                email,
                posts: userPosts.items,
                comments: comments.items,
                likes: likes.items
              });
            })
            .catch(err => console.log(err));
          })
        } else {
          console.log('App: Found user on DynamoDB database!')
          let {bio, comments, id, likes, name, photoUrl, userPosts, username, type, email} = response.data.getUser;
          setLoggedInUserData({
            id,
            name,
            bio,
            username,
            photoUrl,
            type,
            email,
            posts: userPosts.items,
            comments: comments.items,
            likes: likes.items
          });
          setIsAuthenticated(true);
        }
      })
      .catch(err => console.log(err))
    })
    .catch(err => {
      setIsAuthenticated(false);
    })
  }
  
  return (
    <Router>
      <LoggedInUserContext.Provider value={{loggedInUserData, getAuthenticatedUserAndData, isAuthenticated, setIsAuthenticated}}>
        <div className="App" css={{width: '100vw'}}>
          <ScrollToTop />
          <Navbar />
          <Wrapper>
            <Route render={() => <Redirect to="/" />} />
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