import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { apiConnector } from "../../../services/apiConnector";
import { verifyotpEndpoint } from "../../../services/apis";
import toast from "react-hot-toast";
import { registerEndpoint } from "../../../services/apis";
import { useRouter } from "next/navigation";

const LoadingSpinner = () => (
  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-yellow border-r-transparent align-middle motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
);

const Verify_otp = ({ signup }) => {
  const [otp, setOtp] = useState("");
  const { email } = signup;
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await apiConnector("POST", verifyotpEndpoint.VERIFY_OTP_API, {
        otp,
        email,
      });

      if (res.data.success === true) {
        console.log(res.data.message);
        toast.success(res.data.message);
        setVerified(true);
        router.push('/courses');
      } else {
        toast.error(res.data.message);
        setVerified(false);
      }
    } catch (error) {
      console.log("API Error: ", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
      setOtp("");
    }
  };

  useEffect(() => {
    console.log("Verified state has changed:", verified);
    const signupwithverifiedStatus = {
      ...signup,
      verified
    };
    console.log(signupwithverifiedStatus);
    if(verified) {
      apiConnector("POST", registerEndpoint.REGISTER_API, signupwithverifiedStatus)
        .then((res) => {
          if(res.data.success) toast.success(res.data.message);
          if(res.data.error && !res.data.success) {
            if(res.data.error.code === 11000) {
              toast.error(
                `The email address ${res.data.error.keyValue.email} is already associated with an existing account. Please use a different email or contact support if you believe this is an error.`,
                {duration: 10000}
              );
            }
          }
        });
    }  
  }, [verified]);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center px-4 md:px-0">
      <div className="lg:w-1/2 w-full flex flex-col items-center p-4 lg:p-8">
        <h1 className="text-[#652429] font-extrabold text-center text-4xl leading-10">
          Verify Email
        </h1>
        <p className="text-lg leading-6 my-4 mx-6 text-[#000000] font-semibold">
          Enter verification code
        </p>
        <form>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span></span>}
            inputStyle="rounded-[8px] border-2 border-[#652429] text-3xl text-center text-black"
            isInputNum={true}
            shouldAutoFocus={true}
            containerStyle="flex justify-evenly gap-1"
            renderInput={(props) => (
              <input {...props} style={{ width: "1.5em" }} />
            )}
          />
        </form>
        <button
          onClick={handleSubmit}
          type="submit"
          disabled={isLoading}
          className="w-full lg:w-1/2 rounded-md bg-primary-yellow py-3 px-3 rounded-8 mt-6 mx-4 hover:bg-yellow-300 transition-all duration-500 font-medium text-richblack-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              <span className="ml-2">Verifying...</span>
            </>
          ) : (
            "Verify Email"
          )}
        </button>
      </div>
    </div>
  );
};

export default Verify_otp;