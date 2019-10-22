import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import FoodCard from '../components/FoodCard/FoodCard';
import { listPosts } from '../graphql/queries';


const HomePage = ({ userData }) => {
  React.useEffect(() => {
    getAllPosts();
  },[])
  
  const [allPosts, changeAllPosts] = React.useState([])
  
  const getAllPosts = async() => {
    let response = await API.graphql(graphqlOperation(listPosts));
    let sortedPosts = response.data.listPosts.items.sort((a, b) => (a.timeCreated < b.timeCreated) ? -1 : ((a.timeCreated > b.timeCreated) ? 1 : 0)).reverse();
    changeAllPosts(sortedPosts);
  }
  
  return (
    <div className="wrapper" style={{padding: '80px 0'}}>
      {allPosts.map(post => (
        <FoodCard 
          key={post.id} 
          id={post.id} 
          imgUrl={post.picUrl} 
          createdAt={post.timeCreated} 
          blurb={post.blurb} 
          userData={post.user} 
          loggedInUserData={userData}
        />
      ))}
    </div>
  )
}

export default HomePage;
