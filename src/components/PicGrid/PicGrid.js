import React from 'react';
import NewPic from '../NewPic/NewPic';
import './PicGrid.css';


function PicGrid({pics, modalStatus, userData, loggedInUserData}) {
  return (
    <div className="PicGridWrapper">
      <div className="PicGrid">
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
    </div>
  );
}

export default PicGrid;