import React from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { PhotoPicker } from 'aws-amplify-react';
import customTheme from '../customTheme';
import { Button, Icon } from 'antd';
import { createPost } from '../graphql/mutations';
import { genUUID, getISODate } from '../utils';
import { useHistory } from "react-router"


function PostPhotoPage({userData}) {
  const [imgKey, changeImgKey] = React.useState();
  const history = useHistory();
  
  const handlePick = data => {
    console.log(data);
    Storage.put(`${userData.id}/${data.name}`, data.file, {
        level: 'public',
        contentType: data.type
    })
    .then (result => changeImgKey(result.key))
    .catch(err => console.log(err));
  }
  
  const handleSave = async(e) => {
    let createPostInput = {
      id: `postid:${genUUID()}`,
      picUrl: imgKey,
      postUserId: userData.id,
      timeCreated: getISODate()
    };
    const data = await API.graphql(graphqlOperation(createPost, {input: createPostInput}))
    console.log(data);
    history.push("/");
  }
  
  return (
    <div style={{padding: '50px'}}>
     {/* <button onClick={e => console.log(imgKey)}>what is the img key</button> */}
      <PhotoPicker 
        preview 
        theme={customTheme} 
        onPick={handlePick} 
      />
      <div style={{margin: '0 auto', textAlign: 'center', width: '400px'}}>
        <Button 
          block 
          onClick={handleSave} 
          disabled={imgKey ? false : true} 
          type="primary" size="large"
        >
          <Icon type="save" />
          Submit
        </Button>
      </div>
    </div>
  )
}

export default PostPhotoPage;