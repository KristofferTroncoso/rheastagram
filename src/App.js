/** @jsx jsx */
import React from 'react';
import { Auth } from 'aws-amplify';
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
import { jsx } from '@emotion/core';
import { LoggedInUserContext } from './user-context';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import GlobalStyles from './GlobalStyles';
import { gql, useQuery } from '@apollo/client';
import Error from './components/Error/Error';
import Loading from './components/Loading/Loading';

const customGetUserQuery = gql`
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

function App() {
  const [currentCredentials, setCurrentCredentials] = React.useState({});
  React.useEffect(() => {
    Auth.currentCredentials()
    .then(res => setCurrentCredentials(res))
    .catch(err => console.log(err))
  });

  const { loading, error, data, refetch } = useQuery(customGetUserQuery, {variables: {id: currentCredentials.identityId}});

  if (loading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;
  return (
    <Router>
      {true && 
        <LoggedInUserContext.Provider
          value={{
            loggedInUserData: data,
            fetchLoggedInUserData: refetch, 
            currentCredentials,
            setCurrentCredentials
          }}
        >
          <div className="App" css={{width: '100vw'}}>
            <GlobalStyles />
            <ScrollToTop />
            <Navbar />
            <Wrapper>
              {/* <Route render={() => <Redirect to="/" />} /> */}{/* below is a workaround for following issue: when deployed to amplify, it's redirecting to a random hash url */}
              <Route path="/" exact render={props => <HomePage />} />
              <Route path="/user/:id" render={props => <UserPage props={props} />} />
              <Route path="/editprofile" render={props => <EditProfilePage />} />
              <Route path="/post" render={props => <SubmitPostPage />} />
              <Route path="/p/:postId" render={props => <PostPage props={props} />} />
              <Route path="/login" render={props => <LoginPage props={props} />} />  
              {(currentCredentials.authenticated && data.getUser === null) && <Redirect to="/createprofile" />}{/* if user is authenticated but profile record is not in db yet */}
            </Wrapper>
            {window.innerWidth < 600 && <MobileNavbar /> }
          </div>
        </LoggedInUserContext.Provider>
      }
    </Router>
  )
}

export default App;