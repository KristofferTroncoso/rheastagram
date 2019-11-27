import React from 'react';
import { API, Storage, Cache } from 'aws-amplify'
import useSignedS3Url from '../../hooks/useSignedS3Url';

function S3Img({imgKey, ...props}) {
  const signedImgUrl = useSignedS3Url(imgKey);
  
  return (
    <img src={signedImgUrl} {...props} />
  )
}

export default S3Img;
