import React from 'react';
//import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { LoggedInUserContext } from '../../user-context';
import { Redirect } from 'react-router-dom';

/*
function LoginPage() {
  const { authenticated, setIsAuthenticated } = React.useContext(LoggedInUserContext);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  return (
    isAuthenticated
    ? <Redirect to="/" />
    : <div style={{width: '100%', textAlign: 'center', margin: '0 auto', padding: '40px'}}>
      <AmplifyAuthenticator>
        <AmplifySignIn 
          headerText="Log in to your account" 
          slot="sign-in"
          submitButtonText="Log in"
          handleAuthStateChange={handleSignIn}
        ></AmplifySignIn>
        <AmplifySignUp
          slot="sign-up"
          formFields={[
            {
              type: "username",
              label: "Username *",
              placeholder: "username",
              required: true,
            },
            {
              type: "password",
              label: "Password *",
              placeholder: "password",
              required: true,
            },
            {
              type: "email",
              label: "Email *",
              placeholder: "email",
              required: true,
            }
          ]} 
        />
      </AmplifyAuthenticator>
    </div>
  )
}
*/


//temporary fix for broken LoginPage authenticator. 
/*
Problem:
handleAuthStateChange doesn't function as I'd thought. It's more clearly "handleAuthenticatorStateChange".
It fires when changing to the forgotpassword form or signup form. Therefore i was mistakenly changing
isAuthenticated state to true when clicking on "sign up" form.

Temporary Fix: 
Use withAuthenticator HOC.
withAuthenticator doesnt load LoginPage unless authenticated. when succesfully
signed in, it will run useEffect (changing isAuthenticated to true) and redirect to homepage.

Future Fix:
We can remake this by either making a new authenticator from scratch OR
we can use the authenticator components as a separate custom Authenticator component
that wraps this LoginPage. That way the components will be more customizable.
*/
function LoginPage() {
  const { setCurrentCredentials } = React.useContext(LoggedInUserContext);
  React.useEffect(() => {
    setCurrentCredentials({});
  });

  return (
    <Redirect to="/" />
  )
}

export default withAuthenticator(LoginPage);