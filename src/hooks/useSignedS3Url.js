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
          // hoursToCacheSignedUrl should be less than or equal to how long the image is cached in the browser
          let hoursToCacheSignedUrl = 11;
          const dateNow = new Date();
          const expirationTime = dateNow.getTime() + (3600000 * hoursToCacheSignedUrl);
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