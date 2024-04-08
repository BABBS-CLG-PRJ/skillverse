const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/api/contactus",
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
//UPLOAD IMAGE API
export const uploadimageendpoint = {
  UPLOAD_IMAGE_API: BASE_URL + "/api/uploadimage",
}
// VIDEO UPLOAD API
export const uploadvideoendpoint = {
  UPLOAD_VIDEO_API: BASE_URL + "/api/videoupload",
}
//VIDEO STREAM API
export const videostreamendpoint = {
  STREAM_VIDEO_API: BASE_URL + "/api/streamvideo",
}
//VIDEO STREAM API
export const postcommentendpoint = {
  POST_COMMENT_API: BASE_URL + "/api/postcomment",
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