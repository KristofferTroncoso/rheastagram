/** @jsx jsx */
import React from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { API, Storage, graphqlOperation } from 'aws-amplify';
import Avatar from '../../components/Avatar/Avatar';
import { css, jsx } from '@emotion/core';
import { LoggedInUserContext } from '../../user-context';
import { Redirect } from 'react-router-dom';

function EditProfilePage() {
  const { loggedInUserData, getAuthenticatedUserAndData, isAuthenticated } = React.useContext(LoggedInUserContext);
  React.useEffect(() => {
    console.log('edit page affecting!');
    if (loggedInUserData.id === null) {
      console.log('not found yet');
    } else {
      console.log('found');
      changeInitialData({
        name: loggedInUserData.name,
        bio: loggedInUserData.bio
      });
      changeFormData({
        name: loggedInUserData.name,
        bio: loggedInUserData.bio
      })
      changeIsUserFound(true);
    }
  }, [loggedInUserData])
  
  const [isUserFound, changeIsUserFound] = React.useState(false);
  const [initialData, changeInitialData] = React.useState({
    name: '',
    bio: ''
  });
  
  const [formData, changeFormData] = React.useState({
    name: loggedInUserData.name,
    bio: loggedInUserData.bio
  });
  

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData);

    const updateUser = `
      mutation UpdateUser(
        $input: UpdateUserInput!
        $condition: ModelUserConditionInput
      ) {
        updateUser(input: $input, condition: $condition) {
          id
          username
          name
          bio
          email
          photoUrl
        }
      }
    `;

    let updateUserInput = {
      id: loggedInUserData.id,
      name: formData.name,
      bio: formData.bio
    };
    console.log(updateUserInput)
    const data = await API.graphql(graphqlOperation(updateUser, {input: updateUserInput}));
    console.log(data);
    getAuthenticatedUserAndData();
  }
  
  const handlePicUpload = file => {
    console.log(file)
    Storage.put(`${loggedInUserData.id}/${file.name}`, file, {
      level: 'public',
      contentType: file.type
    })
    .then (result => {
      let imgKey = result.key;
      let updateUserInput = {
        id: loggedInUserData.id,
        photoUrl: imgKey
      };
      
      const customChangeProfilePicQuery = `
        mutation ChangeProfilePic($input: UpdateUserInput!) {
          updateUser(input: $input) {
            id
          }
        }
      `;
      
      API.graphql(graphqlOperation(customChangeProfilePicQuery, {input: updateUserInput}))
      .then(res => {
        getAuthenticatedUserAndData(); 
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
    
  }
  
  return (
    isAuthenticated
    ? <div
      css={css`
        padding: 20px;
      `}
    >
      {isUserFound
      ? <div 
          css={css`
            background: white;
            padding: 40px;
            border: 1px solid lightgrey;
            border-radius: 4px;
            height: 600px;
          `}
        >
          <h1>Edit Profile</h1>
          <div css={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
            <Avatar img={loggedInUserData.photoUrl} css={{alignContent: 'center'}} username={loggedInUserData.username} large />
            <div css={{padding: '0 10px'}}>
              <h2 css={{margin: 0, padding: 0}}>{loggedInUserData.username}</h2>
              <Upload 
                accept="image/*" 
                showUploadList={false}
                beforeUpload={handlePicUpload}
              >
                <Button css={{border: 0, color: 'dodgerblue', boxShadow: 'none', margin: 0, padding: 0, height: '22px'}}>
                  <span css={{fontWeight: '700'}}>Change Profile Photo</span>
                </Button>
              </Upload>
            </div>
          </div>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <Input size="large" type="text" name="name" id="name" value={formData.name} onChange={e => changeFormData({...formData, name: e.target.value})}  />
            <label htmlFor="bio">Bio</label>
            <Input size="large" type="text" name="bio" id="bio" value={formData.bio} onChange={e => changeFormData({...formData, bio: e.target.value})} />
            <Button
              disabled={JSON.stringify(formData) === JSON.stringify(initialData) ? true : false}
              type="primary"
              onClick={handleSubmit}
              css={{marginTop: '10px'}}
            >
              Submit
            </Button>
          </Form>
        </div>
      : null
      }
    </div>
    : <Redirect to="/" />
  )
}

export default EditProfilePage;