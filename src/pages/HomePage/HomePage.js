/** @jsx jsx */
import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import FoodCard from '../../components/FoodCard/FoodCard';
import { css, jsx } from '@emotion/core';


const HomePage = ({ userData }) => {
  React.useEffect(() => {
    getAllPosts();
  }, [])

  const [allPosts, changeAllPosts] = React.useState([])

  const getAllPosts = async () => {
    const query = `
      query ListPosts(
        $filter: ModelPostFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            id
            picUrl
            user {
              id
              username
              name
              bio
              email
              photoUrl
            }
            comments {
              nextToken
            }
            likes {
              nextToken
            }
            timeCreated
          }
          nextToken
        }
      }
    `;

    const variables = {
      limit: 12
    }

    let response = await API.graphql(graphqlOperation(query, variables));
    let sortedPosts = response.data.listPosts.items.sort((a, b) => (
      (a.timeCreated < b.timeCreated) 
      ? -1 
      : ((a.timeCreated > b.timeCreated) 
        ? 1 
        : 0)
      )
    ).reverse();
    changeAllPosts(sortedPosts);
  }

  return (
    <div
      css={css`
        padding: 10px 0;
      `}
    >
      {allPosts.map(post => (
        <FoodCard
          key={post.id}
          id={post.id}
          imgUrl={post.picUrl}
          createdAt={post.timeCreated}
          userData={post.user}
          loggedInUserData={userData}
        />
      ))}
    </div>
  )
}

export default HomePage;
