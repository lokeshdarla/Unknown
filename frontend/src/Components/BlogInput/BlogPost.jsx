import React, { useEffect, useState } from 'react';
import avatar1 from '../Images/avatar1.png';
import axios from 'axios';

const MyForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const accessToken = localStorage.getItem('accessToken');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
        setSelectedImage(file);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    adjustTextareaRows(event.target);
  };

  const adjustTextareaRows = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch("http://127.0.0.1:8000/posts/uploadImage", {
        method: "POST",
        body: formData,
      });

      const result=await response.json()
      return result.image_id;
    } catch (error) {
      console.error('Error uploading image:', error.message);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Step 1: Upload the image and get image_id
    const imageId = selectedImage ? await handleImageUpload() : null;

    // Step 2: Create the post
    const postURL = 'http://127.0.0.1:8000/posts/';
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        postURL,
        { content: inputValue, image_id: imageId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setInputValue('');
      setSelectedImage(null);
      console.log(response.data);
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center lg:items-start lg:flex-row'>
        <div className='flex justify-center gap-2'>
          <img src={avatar1} className='rounded-full h-9 w-9' alt='Preview' />
          <textarea
            className="w-auto px-5 py-2 overflow-hidden text-xl text-gray-500 resize-none focus:outline-none lg:w-96"
            placeholder="What is happening?!"
            rows="1"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex items-center justify-end w-auto gap-2 m-2'>
          <label htmlFor='fileInput' className='px-4 py-2 text-xl text-blue-600 rounded-full cursor-pointer bg-blue-50 pointer'>
            +
            <input type='file' id='fileInput' style={{ display: 'none' }} onChange={handleFileChange} />
          </label>
          {selectedImage && (
            <button
              type='button'
              className='px-4 py-2 text-red-600 rounded-full cursor-pointer bg-red-50 pointer'
              onClick={removeImage}
            >
              Remove
            </button>
          )}
          <button type='submit' className='px-4 py-2 text-blue-700 rounded-md bg-blue-50'>Post</button>
        </div>
      </div>
      {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          className='rounded-lg max-w-96 h-44 lg:h-60 l'
          alt='Preview'
        />
      )}
    </form>
  );
};

export default MyForm;
