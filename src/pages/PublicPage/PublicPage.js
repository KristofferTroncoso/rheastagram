/* global fetch */
import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';



function PublicPage({userData}) {
  
  const testFn = e => {
    fetch("https://randomuser.me/api/").then(res => res.json()).then(data => console.log(data));
  }
  
  const amplifyFn = async e => {
    const query = `
      query GetPost($postId: ID!) {
        getPost(id: $postId) {
          id
          picUrl
          user {
            id
          }
          timeCreated
        }
      }
    `;
    const variables = {
      postId: "postid:242e329a-cde7-4223-8c8e-edd585861db1"
    }
    let res = await API.graphql(graphqlOperation(query, variables));
    console.log(res);
  }
  
  const fetchFn = e => {
    console.log(e)
  }
  
  const apolloFn = e => {
    console.log(e)
  }
  
  const urqlFn = e => {
    console.log(e)
  }
  
  const relayFn = e => {
    console.log(e)
  }
  
  return (
    <div style={{paddingTop: '50px'}}>
      <h1>Public Page/Test Page</h1>
      <h3>Testing:</h3>
      <ul>
        <li>amplify API</li>
        <li>native fetch</li>
        <li>apollo</li>
        <li>urql</li>
        <li>relay</li>
      </ul>
      <button onClick={testFn}>test</button>
      <button onClick={amplifyFn}>Amplify</button>
      <button onClick={fetchFn}>native fetch</button>
      <button onClick={apolloFn}>apollo</button>
      <button onClick={urqlFn}>urql</button>
      <button onClick={relayFn}>relay</button>
    </div>
  )
}

export default PublicPage;