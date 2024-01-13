import React from 'react';
import avatar1 from '../Images/avatar1.png';
import avatar3 from '../Images/avatar3.png';

const Card = ({  date, content, author, avatar,image }) => (
  <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md mb-3">
    <div className="flex justify-between items-center mb-5 text-gray-500">
    <div className="flex items-center space-x-4">
        <img className="w-7 h-7 rounded-full" src={avatar} alt="Author Avatar" />
        <span className="font-medium">{author}</span>
        <span className="text-sm">{date}</span>
      </div>
     
    </div>
    <p className="mb-5 font-light text-gray-500">{content}</p>
    <div className="flex justify-center items-center">
     <img src={image} className='rounded-md' alt="" />
    </div>
  </article>
);

const MyPosts = (props) => {
  const blogPosts = [
    {
      date: '14 days ago',
      content:
        'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.',
      author: 'Jese Leos',
      avatar: avatar1,
    },
    {
      date: 'Jan 14',
      content:
        'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.',
      author: 'Jese Leos',
      avatar: avatar1,
      image:"https://placehold.co/600x400"
    },
    {
      date: '14 days ago',
      content:
        'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.',
      author: 'Bonnie Green',
      avatar: avatar3,
      image:"https://placehold.co/200"
    },
    {
      date: '14 days ago',
      content:
        'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.',
      author: 'Jese Leos',
      avatar: avatar1,
      image:"https://placehold.co/400x300?font=roboto"
    },
  ];

  return (
    <section className="bg-white h-max">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex-col flex items-center justify-center">
        <h1 className='w-full text-center  text-4xl font-bold mb-8 text-blue-700'>My Posts..</h1>

      
        <div className=" w-full lg:w-1/2">
          {blogPosts.map((post, index) => (
            <Card key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyPosts;
