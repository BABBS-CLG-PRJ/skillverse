import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { verifyotpEndpoint } from "@/app/services/apis";
import { apiConnector } from "@/app/services/apiConnector";
const Verify_otp = () => {
const[otp,setOtp]=useState('');
const handleSubmit=(e)=>{
  e.preventDefault();
  console.log(otp); // here i am getting my otp
  // so i need to verify this from here
  setOtp('');
}
  return (
    <div>
      <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center px-4 md:px-0">
        <div className="w-full md:max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[#652429] font-extrabold text-center text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 mx-6 text-[#000000] font-semibold">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleSubmit}>
          <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span></span>}
                    inputStyle="rounded-[8px] border-[2px] border-[#652429] text-[3rem] text-center text-black"
                    isInputNum={true}
                    shouldAutoFocus={true}
                    containerStyle="flex justify-evenly gap-4"
                    renderInput={(props) => <input {...props}
                    className="w-10 md:w-14 lg:w-16"
                    style={{ width: '1.5em' }}

                 />}

                    />
            <button
              type="submit"
              className="w-full  bg-primary-yellow py-[12px] px-[12px] rounded-[8px] mt-6 mx-4 hover:bg-yellow-300 transition-all duration-500 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify_otp;
