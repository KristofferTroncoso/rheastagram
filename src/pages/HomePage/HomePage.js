/** @jsx jsx */
import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import HomePageCard from '../../components/HomePageCard/HomePageCard';
import { css, jsx } from '@emotion/core';

const HomePage = () => {
  React.useEffect(() => {
    getAllPosts();
  }, [])

  const [allPosts, changeAllPosts] = React.useState([])

  const getAllPosts = async () => {
    const query = `
      query ListPostsByVisibility(
        $visibility:String
        $sortDirection:ModelSortDirection
        $limit:Int
        $nextToken:String
      ) {
        listPostsByVisibility(
          visibility:$visibility
          sortDirection: $sortDirection
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            id
          }
        }
      }
    `;

    const variables = {
      visibility: 'public',
      sortDirection: 'DESC',
      limit: 12,
      nextToken: null
    }

    let response = await API.graphql(graphqlOperation(query, variables));
    changeAllPosts(response.data.listPostsByVisibility.items);
  }

  return (
    <div
      css={css`
        padding: 10px 0;
      `}
    >
      {allPosts.map(post => (
        <HomePageCard
          key={post.id}
          postId={post.id}
        />
      ))}
    </div>
  )
}

export default HomePage;
