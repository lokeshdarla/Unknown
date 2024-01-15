import React, { useState, useEffect, useRef } from 'react';
import avatar1 from '../Images/avatar1.png';
import MyPosts from './myPosts';
import useAuth from '../../hooks/useAuth';

export default function UserProfile() {
  const [bio, setBio] = useState('Coffee to Code');
  const [isEditing, setIsEditing] = useState(false);
  const { user, logout } = useAuth();

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'bio') {
      setBio(value);
    }
  };

  return (
    <div className="flex items-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <img className="w-32 h-32 mb-3 rounded-full shadow-lg" src={avatar1} alt="User Avatar" />
        <input
          ref={inputRef}
          type="text"
          className={`outline-none mb-1 text-xl font-medium text-gray-900 text-center ${
            isEditing
              ? 'border border-blue-500 px-4 w-96 py-2 rounded-lg text-md text-gray-500 focus:ring-blue-500 focus:border-blue-500'
              : ''
          }`}
          name="username"
          value={user.username}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
        <input
          type="text"
          className={`text-sm text-gray-500 mb-1 text-center outline-none m-1 ${
            isEditing
              ? 'border border-blue-500 w-96 px-4 py-2 rounded-lg text-md text-gray-500 focus:ring-blue-500 focus:border-blue-500'
              : ''
          }`}
          name="bio"
          value={bio}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
        <div className="flex mt-4 md:mt-6">
          <button
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 gap-2"
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
      <div>
        <MyPosts />
      </div>
    </div>
  );
}
