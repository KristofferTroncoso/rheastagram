import React from 'react';
import NewPic from '../NewPic/NewPic';
import './PicGrid.css';

function PicGrid({pics, modalStatus, userData, loggedInUserData}) {
  return (
    <div className="PicGrid wrapper">
      {pics.map((pic) => (
        <NewPic 
          key={pic.id} 
          img={pic.picUrl} 
          post={pic} 
          userData={userData} 
          loggedInUserData={loggedInUserData} 
          hearts={pic.likes.items.length}
          comments={pic.comments.items.length}
        />
      ))}
    </div>
  );
}

export default PicGrid;