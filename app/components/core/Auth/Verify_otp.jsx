import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { apiConnector } from "@/app/services/apiConnector";
import { verifyotpEndpoint } from "@/app/services/apis";
import toast from "react-hot-toast";
const Verify_otp = ({ setVerified, signup }) => {
  const [otp, setOtp] = useState("");
  const { email } = signup;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup at the Verify_Otp page");
    console.log(signup);
    console.log("Otp entered is-->");
    console.log(otp);
    console.log("The email is -->");
    console.log(email);
    try {
      const res = await apiConnector("POST", verifyotpEndpoint.VERIFY_OTP_API, {
        otp,
        email,
      });

      if (res.data.success === true) {
        console.log(res.data.message);
        toast.success(res.data.message);
        setVerified(true);
      } else {
        toast.error(res.data.message);
        setVerified(false);
      }
    } catch (error) {
      console.log(error);
    }

    setOtp("");
  };
  // Implement Add user Here //
  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center px-4 md:px-0">
      <div className="lg:w-1/2 w-full  flex flex-col items-center p-4 lg:p-8">
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
          className="w-full lg:w-1/2 rounded-md bg-primary-yellow py-3 px-3 rounded-8 mt-6 mx-4 hover:bg-yellow-300 transition-all duration-500 font-medium text-richblack-900"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default Verify_otp;
