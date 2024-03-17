import React, { useState, useEffect } from 'react';
import axios from 'axios';
import avatar1 from '../Images/avatar1.png';
import MyForm from '../BlogInput/BlogPost';


const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMilliseconds = now - date;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 'now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 3) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
};

const Card = ({ post }) => (
  <article className="p-6 mb-3 bg-white border border-gray-200 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-5 text-gray-500">
      <div className="flex items-center space-x-4">
        <img className="object-cover rounded-full w-7 h-7" src={post.userProfile} alt="Author Avatar" />
        <span className="font-medium">{post.username}</span>
        <span className="text-sm">{formatTimestamp(post.created_at)}</span>
      </div>
    </div>
    <p className="mb-5 font-light text-gray-500">{post.content}</p>
    {post.image && (
      <img src={`data:image/jpeg;base64,${post.image.image}`} alt="Post Image" />
    )}
  </article>
);

const BlogSection = (props) => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/posts/");
        setBlogPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-white h-max">
      <MyForm />
      <div className="flex flex-col items-center justify-center max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <h1 className='w-full mb-8 text-4xl font-bold text-center text-blue-700'>Today's Feed..</h1>

        <div className="w-full lg:w-1/2">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              post={post}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
