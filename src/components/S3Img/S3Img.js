import React from 'react';
import { API, Storage, Cache } from 'aws-amplify'


function S3Img({imgKey, ...props}) {
  const [signedImgUrl, setSignedImgUrl] = React.useState();
  
  React.useEffect(() => {
    if (imgKey === undefined) {
      console.log('imgKey is undefined');
      return null;
    } else {
      let cacheRes = Cache.getItem(imgKey);
      if (cacheRes === null) {
        Storage.get(imgKey)
        .then(res => {
          setSignedImgUrl(res);
          let dateNow = new Date();
          let expirationTime = dateNow.getTime() + 900000;
          Cache.setItem(imgKey, res, {expires: expirationTime });
        })
        .catch(err => console.log(err));
      } else {
        setSignedImgUrl(cacheRes);
      }      
    }
  }, [imgKey]);
  
  return (
    <img src={signedImgUrl} {...props} />
  )
}

export default S3Img;
