import React from 'react';
import PostCard from './PostCard'; // Import the PostCard component

const postsData = [
  {
    Post: {
      id: 1,
      title: 'Check out the all-time best cartoon',
      content: 'Attack on titan',
      created_at: '2023-11-22T14:02:09.938569',
      owner: {
        id: 1,
        username: 'username1',
        created_at: '2023-11-22T14:01:54.545540',
      },
    },
    votes: 0,
  },
  {
    Post: {
      id: 2,
      title: 'Another post title',
      content: 'Another post content',
      created_at: '2023-11-22T14:05:00.000000',
      owner: {
        id: 2,
        username: 'username2',
        created_at: '2023-11-22T14:02:00.000000',
      },
    },
    votes: 5,
  },
  // Add more posts as needed
];

// Rest of the code remains unchanged

const App = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {postsData.map((post) => (
          <PostCard key={post.Post.id} post={post.Post} />
        ))}
      </div>
    </div>
  );
};

export default App;
