import React, { useState } from 'react';
import avatar1 from '../Images/avatar1.png';

const MyForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
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

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex items-center lg:items-start justify-center flex-col lg:flex-row'>
        <div className='flex gap-2 justify-center'>
          <img src={avatar1} className='h-9 w-9 rounded-full' alt='Preview' />
          <textarea
            className="text-xl px-5 py-2 focus:outline-none text-gray-500 w-auto resize-none overflow-hidden lg:w-96"
            placeholder="What is happening?!"
            rows="1"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div className='m-2 flex items-center justify-end gap-2 w-auto'>
          <label className='px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xl pointer cursor-pointer'>
            <input type='file' style={{ display: 'none' }} onChange={handleFileChange} />
            +
          </label>
          {selectedImage && (
            <button
              className='px-4 py-2 bg-red-50 text-red-600 rounded-full pointer cursor-pointer'
              onClick={removeImage}
            >
              Remove
            </button>
          )}
          <button className='px-4 py-2 bg-blue-50 text-blue-700 rounded-md'>Post</button>
        </div>
      </div>
      {selectedImage && (
        <img
          src={selectedImage}
          className='max-w-96 h-44 lg:h-60 l rounded-lg'
          alt='Preview'
        />
      )}
    </div>
  );
};

export default MyForm;
