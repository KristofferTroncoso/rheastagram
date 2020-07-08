import React from 'react';
import PicGrid from '../../components/PicGrid/PicGrid';
import InfoHeader from '../../components/InfoHeader/InfoHeader';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { css } from '@emotion/core';
import { gql, useQuery } from '@apollo/client';
import Error from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';

/* listUsers query is being used instead of getUser since we have to search
for the user via username instead of uuid */
const listUsersQuery = gql`
  query customListUsers($filter: ModelUserFilterInput) {
    listUsers(filter: $filter) {
      items {
        id
        name
        username
        bio
        photoUrl
        userPosts(sortDirection: DESC) {
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
        }
      }
    }
  }
`;

function UserPage({props}) {
  const { loading, error, data, refetch } = useQuery(
    listUsersQuery, 
    {variables: {
      filter: {
        username: {
          eq: props.match.params.id
        }
      }
    }}
  );

  if (loading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;
  
  return (
    <div
      css={css`
        padding: 15px 0 200px;
        
        @media (max-width: 768px) {
          padding: 0;
        }
      `}
    >
      <>
        <InfoHeader userData={data.listUsers.items[0]} />
        {data.listUsers.items[0].userPosts.items.length > 0 
        ? <PicGrid 
            userData={data.listUsers.items[0]} 
            getUser={refetch} 
          />
        : <Link to="/post">
            <Button 
              style={{
                height: '200px', 
                width: '200px', 
                display: 'flex',
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                margin: '10px 20px'
              }}
              type="dashed"
            >
              <PictureOutlined style={{fontSize: '120px'}} />
              Upload your first photo!
            </Button>            
          </Link>
        }
      </> 
    </div>
  )
}

export default UserPage;