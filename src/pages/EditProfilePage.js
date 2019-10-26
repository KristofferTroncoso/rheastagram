import React from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { updateUser } from '../graphql/mutations';
import { API, Storage, graphqlOperation } from 'aws-amplify';
// import { useHistory } from "react-router";
// import { S3Image } from 'aws-amplify-react';
import Avatar from '../components/Avatar/Avatar';


function EditProfilePage({userData, getAuthenticatedUserAndData}) {
  React.useEffect(() => {
    console.log('edit page affecting!');
    if (userData.id === null) {
      console.log('not found yet');
    } else {
      console.log('found');
      changeInitialData({
        name: userData.name,
        bio: userData.bio
      });
      changeFormData({
        name: userData.name,
        bio: userData.bio
      })
      changeIsUserFound(true);
    }
  }, [userData])
  
  
  // const history = useHistory();

  
  const [isUserFound, changeIsUserFound] = React.useState(false);
  const [initialData, changeInitialData] = React.useState({
    name: '',
    bio: ''
  });
  
  const [formData, changeFormData] = React.useState({
    name: userData.name,
    bio: userData.bio
  });
  

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    let updateUserInput = {
      id: userData.id,
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
    Storage.put(`${userData.id}/${file.name}`, file, {
      level: 'public',
      contentType: file.type
    })
    .then (result => {
      let imgKey = result.key;
      let updateUserInput = {
        id: userData.id,
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
    <div style={{padding: '40px 0'}}>
      {isUserFound
      ? <div 
          className="wrapper" 
          style={{
            background: 'white',
            marginTop: '60px',
            padding: '40px',
            border: '1px solid lightgrey',
            borderRadius: '4px',
            height: '600px'
          }}
        >
          <h1>Edit Profile</h1>
          <div style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
            <Avatar img={userData.profilePhotoUrl} style={{alignContent: 'center'}} username={userData.username} />
            <div style={{padding: '0 10px'}}>
              <h2 style={{margin: 0, padding: 0}}>{userData.username}</h2>
              <Upload 
                accept="image/*" 
                showUploadList={false}
                beforeUpload={handlePicUpload}
              >
                <Button style={{border: 0, color: 'dodgerblue', boxShadow: 'none', margin: 0, padding: 0, height: '22px'}}><span style={{fontWeight: '700'}}>Change Profile Photo</span></Button>
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
              style={{marginTop: '10px'}}
            >
              Submit
            </Button>
          </Form>
        </div>
      : null
      }
    </div>
  )
}


export default EditProfilePage;