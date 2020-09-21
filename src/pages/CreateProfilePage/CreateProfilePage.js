/** @jsx jsx */
import React from 'react';
import { Auth } from 'aws-amplify';
import { Redirect } from 'react-router-dom';
import { css, jsx } from '@emotion/core';
import { getISODate } from '../../utils';
import { gql, useMutation } from '@apollo/client';
import { Button, Form, Input, Upload, Avatar } from 'antd';
import { Storage } from 'aws-amplify';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";

//make sure to redirect to homepage or editprofile if the profile already exists.

const createUserQuery = gql`
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      bio
      username
      photoUrl
      type
      email
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

function CreateProfilePage({props}) {
  const history = useHistory();
  const [formData, changeFormData] = React.useState({
    name: '',
    bio: ''
  });

  const [createUser] = useMutation(createUserQuery);
  React.useEffect(() => {
    Auth.currentCredentials()
    .then(currentCredentialsRes => {
      if (!currentCredentialsRes.authenticated) {
        history.push('/login')
      } else {
        Auth.currentAuthenticatedUser()
        .then(currentAuthenticatedUserRes => {
          const variables = {
            id: currentCredentialsRes.identityId,
            name: currentAuthenticatedUserRes.username,
            bio: `Hello I'm ${currentAuthenticatedUserRes.username}`,
            username: currentAuthenticatedUserRes.username,
            photoUrl: '',
            type: 'user',
            email: currentAuthenticatedUserRes.attributes.email
          };
          console.log(currentAuthenticatedUserRes)
          console.log(variables)
        })
        .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
  });


  
  const handleSubmit = e => {
    e.preventDefault();
    console.log('hey')
  }

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 3, span: 6 },
  };

  const handleWat = () => {
    Auth.currentCredentials()
    .then(res => console.log(res))
  }

  return (
    <div   
      css={css`
        width: 700px;
        text-align: center;
        margin: 0 auto;
        padding: 40px;
      `}
    >
      <button onClick={handleWat}>currentCredentials</button>
      <h1>Welcome!</h1>
      <div css={css`margin-bottom: 50px`}>
        <Avatar icon={<UserOutlined />} size={200} />
      </div>
      <Form onSubmit={handleSubmit} {...layout}>
        <Form.Item label="Name" name="name">
          <Input size="large" type="text" name="name" id="name" value={formData.name} onChange={e => changeFormData({...formData, name: e.target.value})}  />
        </Form.Item>
        <Form.Item label="Bio" name="bio">
          <Input size="large" type="text" name="bio" id="bio" value={formData.bio} onChange={e => changeFormData({...formData, bio: e.target.value})} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" block>
            Save profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateProfilePage;
/* 
  // const fetchLoggedInUserData = () => {
  //   Auth.currentCredentials()
  //   .then(res => {
  //     API.graphql(graphqlOperation(customGetUserQuery, {id: res.identityId}))
  //     .then(response => {
  //       if (response.data.getUser === null) {
  //         console.log("Not found. Create new profile on database");
  //         Auth.currentAuthenticatedUser()
  //         .then(d => {
  //           const variables = {
  //             id: res.identityId,
  //             username: d.username,
  //             email: d.attributes.email,
  //             name: d.username,
  //             bio: `Hello my name is ${d.username} and Rhea is awesome`,
  //             type: "user",
  //             timeCreated: getISODate()
  //           };
  //           console.log('youre authenticated. trying to create record on db')
  //           API.graphql(graphqlOperation(createUserQuery, {input: variables}))
  //           .then(res => {
  //             console.log(res);
  //             let {bio, comments, id, likes, name, photoUrl, userPosts, username, type, email} = res.data.createUser;
  //             setLoggedInUserData({
  //               id,
  //               name,
  //               bio,
  //               username,
  //               photoUrl,
  //               type,
  //               email,
  //               posts: userPosts.items,
  //               comments: comments.items,
  //               likes: likes.items
  //             });
  //           })
  //           .catch(err => console.log(err));
  //         })
  //       } else {
  //         console.log('App: Found user on DynamoDB database!')
  //         let {bio, comments, id, likes, name, photoUrl, userPosts, username, type, email} = response.data.getUser;
  //         setLoggedInUserData({
  //           id,
  //           name,
  //           bio,
  //           username,
  //           photoUrl,
  //           type,
  //           email,
  //           posts: userPosts.items,
  //           comments: comments.items,
  //           likes: likes.items
  //         });
  //         setIsAuthenticated(true);
  //       }
  //     })
  //     .catch(err => console.log(err))
  //   })
  //   .catch(err => {
  //     setIsAuthenticated(false);
  //   })
  // } */