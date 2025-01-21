import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import countryCode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phoneNo: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (submitSuccess) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+91",
        phoneNo: "",
        message: "",
      });
      setSubmitSuccess(false);
    }
  }, [submitSuccess]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNo) newErrors.phoneNo = "Phone number is required";
    if (
      formData.phoneNo &&
      (formData.phoneNo.length < 8 || formData.phoneNo.length > 10)
    ) {
      newErrors.phoneNo = "Enter a valid phone number";
    }
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const phoneNumber = formData.countryCode + " " + formData.phoneNo;
      const { firstName, lastName, email, message } = formData;

      const res = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, {
        firstName,
        lastName,
        email,
        message,
        phoneNumber,
      });

      if (res.data.success === true) {
        toast.success("Message sent successfully");
        setSubmitSuccess(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const inputClassName =
    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200 bg-white text-gray-900";
  const labelClassName = "block text-sm font-medium text-black mb-1";
  const errorClassName = "text-sm text-red-500 mt-1";

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl shadow-lg p-8 border bg-gradient-to-r from-yellow-200 to-orange-200">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        Contact Us
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className={labelClassName}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className={`${inputClassName} ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className={errorClassName}>{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className={labelClassName}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className={`${inputClassName} border-gray-300`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClassName}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`${inputClassName} ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className={errorClassName}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phoneNo" className={labelClassName}>
            Phone Number
          </label>
          <div className="flex gap-4">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className={`${inputClassName} w-32 cursor-pointer transition-all duration-300 ease-in-out`}
            >
              {countryCode.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.code} - {item.country}
                </option>
              ))}
            </select>

            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="123-456-7890"
              className={`${inputClassName} ${
                errors.phoneNo ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.phoneNo && <p className={errorClassName}>{errors.phoneNo}</p>}
        </div>

        <div>
          <label htmlFor="message" className={labelClassName}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here"
            rows="5"
            className={`${inputClassName} ${
              errors.message ? "border-red-500" : "border-gray-300"
            } resize-none`}
          />
          {errors.message && <p className={errorClassName}>{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg text-white font-medium 
            ${
              loading
                ? "bg-yellow-400 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-500"
            }
            transition duration-200 flex items-center justify-center`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
