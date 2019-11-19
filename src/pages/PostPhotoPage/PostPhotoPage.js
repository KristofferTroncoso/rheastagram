import React from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { PhotoPicker } from 'aws-amplify-react';
import awsCustomTheme from '../../awsCustomTheme';
import { Button, Icon } from 'antd';
import { createPost } from '../../graphql/mutations';
import { genUUID, getISODate } from '../../utils';
import { useHistory } from "react-router"
import styled from 'styled-components';

const StyledPageWrapper = styled.div`
  padding: 50px 0;
  margin: 0 auto;
  
  @media (max-width: 500px){
    padding: 70px 0;
  }
`;

const StyledDiv = styled.div`
  margin: 0 auto;
  text-align: center;
  max-width: 400px;
  padding: 0 5px;
`;

const StyledH2 = styled.h2`
  color: tomato;
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
    <StyledPageWrapper className="wrapper">
      <PhotoPicker 
        preview 
        theme={{...awsCustomTheme, formSection: {padding: '10px 15px 0'}}} 
        onPick={handlePick} 
      />
      <StyledDiv>
        {isTooBig && 
          <StyledH2>
            Photo is too large. Please upload a smaller photo.
          </StyledH2>
        }
        <Button 
          block 
          onClick={handleSave} 
          disabled={imgKey ? false : true} 
          type="primary" size="large"
        >
          <Icon type="save" />
          Submit
        </Button>
      </StyledDiv>
    </StyledPageWrapper>
  )
}

export default PostPhotoPage;