/** @jsx jsx */
import HomePageCard from '../../components/HomePageCard/HomePageCard';
import { css, jsx } from '@emotion/core';
import { gql, useQuery } from '@apollo/client';
import Error from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';

export const ListPostsByVisibilityQuery = gql`
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

const HomePage = () => {
  const { loading, error, data, refetch } = useQuery(
    ListPostsByVisibilityQuery, 
    {variables: {
      visibility: 'public',
      sortDirection: 'DESC',
      limit: 12,
      nextToken: null
    }}
  );

  if (loading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <div
      css={css`
        padding: 10px 0;
      `}
    >
      {data.listPostsByVisibility.items.map(post => (
        <HomePageCard
          key={post.id}
          postId={post.id}
        />
      ))}
    </div>
  )
}

export default HomePage;
