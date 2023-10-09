const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
};
// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
};
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/contact/contactUs",
};
// USER-REGISTRATION API
export const registerEndpoint = {
  REGISTER_API: BASE_URL + "/api/adduser",
}
// GET OTP API
export const otpEndpoint = {
  OTP_API: BASE_URL + "/api/getotp",
}
// RESET PASSWORD API
export const resetpasswordEndpoint = {
  RESET_PASSWORD_API: BASE_URL + "/api/resetpassword",
}
// LOGIN API
export const loginEndpoint = {
  LOGIN_API: BASE_URL + "/api/validateuser",
}
// VERIFY OTP API
export const verifyotpEndpoint = {
  VERIFY_OTP_API: BASE_URL + "/api/verifyotp",
}
// VERIFY TOKEN API
export const verifytokenEndpoint = {
  VERIFY_TOKEN_API: BASE_URL + "/api/verifytoken",
}