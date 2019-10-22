import React from 'react';
import NewPic from '../NewPic/NewPic';
import './PicGrid.css';


function PicGrid({pics, modalStatus, userData, loggedInUserData, getUser}) {
  return (
    <div className="PicGridWrapper">
      <div className="PicGrid">
        {pics.map((pic) => (
          <NewPic 
            key={pic.id} 
            postId={pic.id}
            img={pic.picUrl} 
            post={pic} 
            userData={userData} 
            loggedInUserData={loggedInUserData} 
            hearts={pic.likes.items.length}
            comments={pic.comments.items.length}j
            getUser={getUser}
          />
        ))}
      </div>
    </div>
  );
}

export default PicGrid;