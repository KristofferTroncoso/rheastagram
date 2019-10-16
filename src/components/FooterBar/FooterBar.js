import React from 'react';
import { Auth } from 'aws-amplify';
import { genUUID, getISODate } from '../../utils';


function FooterBar({post, getUserData, list, identityId, userData}) {
  return (
    <div
      style={{
        background: 'white',
        height: '50px',
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        padding: '10px',
        borderTop: '1px solid #e6e6e6'
      }}
    >
      <button onClick={e => Auth.currentSession().then(d => console.log(d))}>
        Current Session
      </button>
      <button onClick={e => Auth.currentAuthenticatedUser().then(d => console.log(d))}>
        Current Authenticated User
      </button>
      <button onClick={e => Auth.currentCredentials().then(d => console.log(d))}>
        Current Credentials
      </button>
      {/*
      <PhotoPicker 
        theme={customTheme}
        onPick={data => console.log(data)}
        preview
      />
      */}
      <button onClick={post}>Post</button>
      <button onClick={getUserData}>Get</button>  
      <button onClick={() => list(identityId)}>List</button>
      <button onClick={e => console.log(userData)}>console log userdata</button>
      <button onClick={e => console.log(genUUID())}>genuuid</button>
      <button onClick={e => console.log(getISODate())}>getisodate</button>
    </div>
  )
}

export default FooterBar;