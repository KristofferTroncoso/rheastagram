import React from 'react';
import { Storage, Cache } from 'aws-amplify';
import { LoggedInUserContext } from '../user-context';

function useSignedS3Url(imgKey) {
  const [signedUrl, setSignedUrl] = React.useState();
  const { loggedInUserData, currentCredentials } = React.useContext(LoggedInUserContext);

  // hoursToCacheImageInBrowser is located in SubmitPostPage.js
  // how long the signed url is valid for
  let hoursTillSignedUrlExpires = currentCredentials.authenticated ? 11 : 0.5;
  // hoursToCacheSignedUrl should be less than or equal to hoursTillSignedUrlExpires
  let hoursToCacheSignedUrl = currentCredentials.authenticated ? 11 : 0.5;
  
  React.useEffect(() => {
    if (!imgKey) {
      console.log("image key is undefined");
      setSignedUrl(undefined);
    } else {
      let cacheKey = `_${loggedInUserData.getUser ? loggedInUserData.getUser.id : 'temp'}/${imgKey}`
      let cacheRes = Cache.getItem(cacheKey);
      if (cacheRes === null) {
        console.log('getting new signed url for image')
        Storage.get(imgKey, { expires: 3600 * hoursTillSignedUrlExpires })
        .then(data => {
          setSignedUrl(data);
          const dateNow = new Date();
          const expirationTime = dateNow.getTime() + (3600000 * hoursToCacheSignedUrl);
          Cache.setItem(cacheKey, data, {expires: expirationTime });
        })
        .catch(err => console.log(err));
      } else {
        console.log("Image is in cache (You saved bandwidth!)")
        setSignedUrl(cacheRes);
      }
    }
  }, [imgKey, hoursTillSignedUrlExpires, hoursToCacheSignedUrl, loggedInUserData]);

  return signedUrl;
}

export default useSignedS3Url;