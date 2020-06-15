import React from 'react';
import { Storage, Cache } from 'aws-amplify';

function useSignedS3Url(imgKey) {
  const [signedUrl, setSignedUrl] = React.useState();
  
  React.useEffect(() => {
    if (!imgKey) {
      console.log("image key is undefined");
      setSignedUrl(undefined);
    } else {
      let cacheRes = Cache.getItem(imgKey);
      if (cacheRes === null) {
        console.log('getting new signed url for image')
        Storage.get(imgKey)
        .then(data => {
          setSignedUrl(data);
          let dateNow = new Date();
          let expirationTime = dateNow.getTime() + 900000;
          Cache.setItem(imgKey, data, {expires: expirationTime });
        })
        .catch(err => console.log(err));
      } else {
        console.log("Image is in cache (You saved bandwidth!)")
        setSignedUrl(cacheRes);
      }
    }
  }, [imgKey]);
  
  return signedUrl;
}

export default useSignedS3Url;