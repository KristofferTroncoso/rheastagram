import React from 'react';
import { Storage, Cache } from 'aws-amplify';

function useSignedS3Url(imgKey) {
  const [signedUrl, setSignedUrl] = React.useState();
  
  React.useEffect(() => {
    if (!imgKey) {
      console.log('undefined')
    } else {
      let cacheRes = Cache.getItem(imgKey);
      if (cacheRes === null) {
        console.log('getting new signedUrl')
        Storage.get(imgKey)
        .then(d => {
          setSignedUrl(d);
          let dateNow = new Date();
          let expirationTime = dateNow.getTime() + 900000;
          Cache.setItem(imgKey, d, {expires: expirationTime });
        })
        .catch(err => console.log(err));
      } else {
        console.log('img is cached')
        setSignedUrl(cacheRes);
      }
    }
  }, [imgKey]);
  
  return signedUrl;
}

export default useSignedS3Url;