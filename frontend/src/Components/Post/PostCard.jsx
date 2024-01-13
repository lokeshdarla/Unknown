import React from 'react';
import avatar1 from '../Images/avatar1.png';
import avatar3 from '../Images/avatar3.png';

// Card component
const Card = ({ category, date, title, content, author, avatar }) => (
  <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
    <div className="flex justify-between items-center mb-5 text-gray-500">
      <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
        {category}
      </span>
      <span className="text-sm">{date}</span>
    </div>
    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
      <a href="#">Hello</a>
    </h2>
    <p className="mb-5 font-light text-gray-500">{content}</p>
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img className="w-7 h-7 rounded-full" src={avatar} alt="Author Avatar" />
        <span className="font-medium">{author}</span>
      </div>
    </div>
  </article>
);

const BlogSection = (props) => {
  // Sample blog data
  const blogPosts = [
    {
      category: 'Tutorial',
      date: '14 days ago',
      title: 'How to quickly deploy a static website',
      content:
        'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.',
      author: 'Jese Leos',
      avatar: avatar1,
    },
    {
      category: 'Article',
      date: '14 days ago',
      title: 'Our first project with React',
      content:
        'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.',
      author: 'Bonnie Green',
      avatar: avatar3,
    },
  ];

  return (
    <section className="bg-white h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">Our Blog</h2>
          <p className="font-light text-gray-500 sm:text-xl">
            We use an agile approach to test assumptions and connect with the needs of your audience early and often.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {blogPosts.map((post, index) => (
            <Card key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
