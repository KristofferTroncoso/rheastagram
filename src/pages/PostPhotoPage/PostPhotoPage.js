import React from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { PhotoPicker } from 'aws-amplify-react';
import awsCustomTheme from '../../awsCustomTheme';
import { Button, Icon } from 'antd';
import { createPost } from '../../graphql/mutations';
import { genUUID, getISODate } from '../../utils';
import { useHistory } from "react-router"
import styled from 'styled-components';

const StyledDiv = styled.div`
  padding: 50px 0;
  margin: 0 auto;
`;

function PostPhotoPage({userData}) {
  const [imgKey, changeImgKey] = React.useState();
  const [isTooBig, changeIsTooBig] = React.useState();
  const history = useHistory();
  
  const handlePick = data => {
    console.log(data);
    if (data.size > 300000) {
      changeIsTooBig(true);
      changeImgKey(null);
    } else {
      changeIsTooBig(false);
      Storage.put(`${userData.id}/${genUUID()}-${data.name}`, data.file, {
          level: 'public',
          contentType: data.type
      })
      .then (result => changeImgKey(result.key))
      .catch(err => console.log(err));     
    }
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
    <StyledDiv className="wrapper">
      <PhotoPicker 
        preview 
        theme={awsCustomTheme} 
        onPick={handlePick} 
      />
      <div style={{margin: '0 auto', textAlign: 'center', maxWidth: '400px', padding: '0 5px'}}>
        {isTooBig && <h2 style={{color: 'tomato'}}>Photo is too large. Please upload a smaller photo.</h2>}
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
    </StyledDiv>
  )
}

export default PostPhotoPage;