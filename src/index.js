import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import awsconfig from './aws-exports';
import Amplify, { Auth } from 'aws-amplify';
import 'antd/dist/antd.css';
import { InMemoryCache, ApolloProvider, ApolloClient, createHttpLink, ApolloLink  } from '@apollo/client';
import { createAuthLink } from 'aws-appsync-auth-link';

Amplify.configure(awsconfig);

const url = awsconfig.aws_appsync_graphqlEndpoint;
const region = awsconfig.aws_appsync_region;

const auth = {
  type: awsconfig.aws_appsync_authenticationType,
  credentials: () => Auth.currentCredentials()
};

const link = ApolloLink.from([
   createAuthLink({ url, region, auth: auth }), 
   createHttpLink({ uri: url })
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
