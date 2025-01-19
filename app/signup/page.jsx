"use client";
import { useState, useEffect } from "react";
import SignUp from "../assets/Images/SignUp.json";
import Template from "../components/core/Auth/Template";
import Verify_otp from "../components/core/Auth/Verify_otp";
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import axios from 'axios';

function Signup() {
  const router = useRouter();
  const cookies = useCookies();
  const [isLoading, setIsLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [otp_sent2, setOtpsent2] = useState(false);
  const [signup2, setsignup22] = useState({});

  // Check for existing authentication on component mount
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        const existingToken = cookies.get('authtoken');
        
        if (existingToken) {
          // Verify the existing token
          const response = await axios.post('/api/verifytoken', { token: existingToken });
          
          if (response.data.decodedToken) {
            // If token is valid, redirect to dashboard
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

  function otp_loading2(otp_sent1, loading1) {
    setLoading2(loading1);
    setOtpsent2(otp_sent1);
  }

  function setsignup2(signup1) {
    setsignup22(signup1);
  }

  // Show loading state while checking existing token
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return otp_sent2 ? (
    <Verify_otp signup={signup2} />
  ) : (
    <Template
      title="Join the millions upskilling with Skillverse"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={SignUp}
      formType="signup"
      otp_loading2={otp_loading2}
      setsignup2={setsignup2}
    />
  );
}

export default Signup;