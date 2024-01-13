import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../Components/Alert/Alert';
import { AudioLines } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";

function SignUpSection(){ {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [alert, setAlert] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch('http://127.0.0.1:8000/Users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Signup successful
        const userData = await response.json();
        console.log('Signup successful', userData);

        // Set the alert for success
        setAlert({ type: 'success', message: 'Account created successfully!' });
      } else {
        // Signup failed
        console.error('Signup failed');
        setAlert({ type: 'error', message: 'Failed to create account. Please try again.' });
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setAlert({ type: 'error', message: 'Error during signup. Please try again.' });
    }
  };

    return (
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex items-center text-blue-700 text-lg gap-2 justify-center">
              <AudioLines size={32}/>
          </div>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Create your account
              </h1>
              {alert && <Alert type={alert.type} message={alert.message} />}
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSignUp}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="email"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="py-3 px-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                    placeholder="name@company.com"
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
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    placeholder="••••••••"
                    className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-3 px-5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Create an account
                </button>
                <button className='py-3 px-6 border border-gray-600 w-full rounded-md flex items-center gap-2 justify-center text-sm'>
                <FcGoogle size={20}/> Continue with Google
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already Have an account ?{' '}
                  <Link to="/auth" className="font-medium text-primary-600 hover:underline">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return <SignUpForm />;
}

export default SignUpSection;