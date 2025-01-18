'use client';
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import Login from '../assets/Images/Login.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { apiConnector } from '../services/apiConnector';
import { loginEndpoint } from '../services/apis';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import axios from 'axios';

const LoginPage = () => {
  const router = useRouter();
  const cookies = useCookies();
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  // Check for existing token on component mount
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        const existingToken = cookies.get('authtoken');
        console.log('Existing token:', existingToken);
        
        if (existingToken) {
          // Verify the existing token
          const response = await axios.post('/api/verifytoken', { token: existingToken });
          
          if (response.data.decodedToken) {
            // If token is valid, store userId and redirect
            localStorage.setItem('userId', response.data.decodedToken.userObject._id);
            router.push('/dashboard');
            return;
          } else {
            // If token is invalid, clear it
            cookies.remove('authtoken');
            localStorage.removeItem('userId');
          }
        }
      } catch (error) {
        console.error('Error verifying existing token:', error);
        // Clear invalid token
        cookies.remove('authtoken');
        localStorage.removeItem('userId');
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingAuth();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const verifyToken = async (token) => {
    try {
      const response = await axios.post('/api/verifytoken', { token });
      if (response.data.decodedToken) {
        localStorage.setItem('userId', response.data.decodedToken.userObject._id);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiConnector('POST', loginEndpoint.LOGIN_API, formData);
      const { success, authtoken, message } = response.data.result;

      if (success && authtoken) {
        localStorage.setItem('authtoken', authtoken);
        cookies.set('authtoken', authtoken);
        
        // Verify token before redirecting
        const isTokenValid = await verifyToken(authtoken);
        
        if (isTokenValid) {
          toast.success('Login successful! Redirecting...', {
            style: {
              background: '#1F1E20',
              color: 'white',
            },
            position: 'bottom-right',
          });
          router.push('/dashboard');
        } else {
          throw new Error('Invalid authentication token');
        }
      } else {
        throw new Error(message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred during login', {
        style: {
          background: '#1F1E20',
          color: 'white',
        },
        position: 'bottom-right',
      });
      setIsLoading(false);
    }
  };

  // Show loading state while checking existing token
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col md:flex-row items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4 md:mx-0 md:mr-8">
        <div className="flex flex-col space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Build skills for today, tomorrow, and beyond.
              <span className="text-pink-500 font-medium"> Education to future-proof your career.</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Email Address
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Password
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium 
                ${isLoading 
                  ? 'bg-yellow-400 cursor-not-allowed' 
                  : 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700'
                } transition-all duration-200 transform hover:scale-[1.02]`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>

      <div className="w-full md:w-1/2 max-w-lg mt-8 md:mt-0">
        <Lottie animationData={Login} className="w-full h-full" />
      </div>
    </div>
  );
};

export default LoginPage;