/** @jsx jsx */
import React from 'react';
import { Storage } from 'aws-amplify';
import { Button, Switch } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { genUUID, getISODate } from '../../utils';
import { useHistory } from "react-router"
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import { LoggedInUserContext } from '../../user-context';
import PicUploader from '../../components/PicUploader/PicUploader';
import PicUploaderCompatibilityMode from '../../components/PicUploader/PicUploaderCompatibilityMode';
import { gql, useMutation } from '@apollo/client';
import { ListPostsByVisibilityQuery } from '../HomePage/HomePage';

const StyledPageWrapper = styled.div`
  padding: 40px 0;
  margin: 0 auto;
  
  @media(max-width: 768px) {
    padding: 0;
  }
`;

const StyledDiv = styled.div`
  margin: 0 auto;
  text-align: center;
  max-width: 360px;
  padding: 0 15px;
`;

const createPostMutation = gql`
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
    }
  }
`;



function SubmitPostPage() {
  const [imgFile, changeImgFile] = React.useState();
  const [isOnCompatibilityMode, setIsOnCompatibilityMode] = React.useState(false);
  const { loggedInUserData, currentCredentials } = React.useContext(LoggedInUserContext);
  const history = useHistory();
  const [createPost] = useMutation(
    createPostMutation,
    {
      update(cache, { data: { createPost } }) {
        const res = cache.readQuery({ query: ListPostsByVisibilityQuery, variables: {
          visibility: 'public',
          sortDirection: 'DESC',
          limit: 12,
          nextToken: null
        }});
        cache.writeQuery({
          query: ListPostsByVisibilityQuery,
          variables: {
            visibility: 'public',
            sortDirection: 'DESC',
            limit: 12,
            nextToken: null
          },
          data: { listPostsByVisibility: {items: [createPost, ...res.listPostsByVisibility.items] }}
        });
      }
    }
  );
  
  const handleCompatibilityModeToggle = checked => {
    setIsOnCompatibilityMode(checked);
  }

  const handleSave = e => {
    let hoursToCacheImageInBrowser = 12;
    Storage.put(`${loggedInUserData.getUser.id}/${genUUID()}-${imgFile.name}`, imgFile, {
      level: 'public',
      contentType: imgFile.type,
      cacheControl: `max-age=${3600 * hoursToCacheImageInBrowser}`
    })
    .then (result => {
      let createPostInput = {
        id: `postid:${genUUID()}`,
        picUrl: result.key,
        type: "post",
        visibility: "public",
        userId: loggedInUserData.getUser.id,
        timeCreated: getISODate()
      };

      createPost({variables: {input: createPostInput}})
        .then(res => {
          history.push("/")
        })
        .catch(err => {console.log(err)})
    })
    .catch(err => console.log(err)); 
  }
  
  return (
    currentCredentials.authenticated
    ?<StyledPageWrapper>
      <StyledDiv>
        {isOnCompatibilityMode
        ? <PicUploaderCompatibilityMode changeImgFile={changeImgFile} />
        : <PicUploader changeImgFile={changeImgFile} />
        }
        <Button 
          block 
          onClick={handleSave} 
          disabled={imgFile ? false : true} 
          type="primary" 
          size="large"
        >
          <SaveOutlined />
          Submit
        </Button>
        <div css={{paddingTop: '30px'}}>
          <p>Issues with edited photo? Try compatibility mode.</p>
          Compatibility Mode: <Switch onChange={handleCompatibilityModeToggle} />
        </div>
      </StyledDiv>
    </StyledPageWrapper>
    :<Redirect to="/login" />
  )
}

export default SubmitPostPage;