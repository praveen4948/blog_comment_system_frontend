import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard  from './PostCard';
import { Header } from './Header';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/blog/all_blogs/');
        setBlogs(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Header/>
    <div className='container'>
      <h1>All Blogs</h1>
      <div className='all_blog'>
        {blogs.map((blog,idx) => (
          <PostCard key={idx} blog={blog}/>
        ))}
        {blogs.length === 0 && <p>No blogs available</p>}
      </div>
    </div>
    </>
  );
};
