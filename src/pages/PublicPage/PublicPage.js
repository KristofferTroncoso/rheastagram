import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../../graphql/queries';

function PublicPage({userData}) {
  React.useEffect(() => {
    //load all public posts
    let allPosts = API.graphql(graphqlOperation(listUsers));
    console.log(allPosts)
  },[])
  
  return (
    <div style={{paddingTop: '50px'}}>
      <h1>Public Page</h1>
    </div>
  )
}

export default PublicPage;