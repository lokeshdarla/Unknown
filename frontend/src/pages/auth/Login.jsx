import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../Components/Alert/Alert';
import { useNavigate } from 'react-router-dom'
import { AuthPage } from '../../Components/GoogleAuth/GoogleAuth';
import { AudioLines } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";

function LoginSection() {
  const navigation = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const loginUrl = 'http://127.0.0.1:8000/auth';
  const handleLogin = async () => {
    try {
      if (!username.trim() || !password.trim()) {
        return;
      }


      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAlert({ type: 'success', message: 'Login successful!' });
        setUsername('');
        setPassword('');
      navigation('/')
      } else {
        const errorData = await response.json();
        setAlert({ type: 'error', message: 'Failed to log in. Please try again.' });
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setAlert({ type: 'error', message: error.message });
      setUsername('');
      setPassword('');
    }
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
          <div className="flex items-center text-blue-700 text-lg gap-2 justify-center">
              <AudioLines size={32}/>
          </div>
                    <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-center">
              Welcome Back
            </h1>
           
            {alert && <Alert type={alert.type} message={alert.message} />}
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="border border-gray-400 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full py-3 px-5"
                  placeholder="Email Address"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className=" border border-gray-400 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full py-3 px-5"
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleLogin}
                className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-5 py-3 text-center mb-2"
              >
                Continue
              </button>
              <button className='py-3 px-6 border border-gray-600 w-full rounded-md flex items-center gap-2 justify-center text-sm'>
              <FcGoogle size={20}/> Login with Google
              </button>
              <p className="text-sm font-light text-gray-500">
                Create New account?{' '}
                <Link to="/signup" className="font-medium text-primary-600 hover:underline">
                  here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginSection;
