import React from 'react';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react';
import { LoggedInUserContext } from '../../user-context';
import { Redirect } from 'react-router-dom';

function LoginPage() {
  const { isAuthenticated, setIsAuthenticated } = React.useContext(LoggedInUserContext);

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

export default LoginPage;