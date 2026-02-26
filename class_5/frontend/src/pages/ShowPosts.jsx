import { useState, useEffect } from 'react';
import axios from 'axios'
import { use } from 'react';



const ShowPosts = () => {
    const [posts, setPosts] = useState([
        // {
        //     _id:_id,
        //     image: image,
        //     caption:caption
        // }
    ]);


    useEffect(()=>{
        const fetchPosts = async()=>{
            try {
                const res = await axios.get('http://localhost:3000/posts');
                // console.log(res)
                setPosts(res.data.posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        fetchPosts();
    },[]);

  return (
    <div className='imagesContainer'>
      {posts.length > 0 ? (posts.map(post => (
        <div key={post._id}>
          <img src={post.image} alt={post.caption} />
          <p>{post.caption}</p>
        </div>
      ))):( <p>No posts available</p>)
      }



    </div>
  )
}

export default ShowPosts