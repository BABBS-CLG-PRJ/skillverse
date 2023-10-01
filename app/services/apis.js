const BASE_URL = process.env.NEXT_APP_BASE_URL;
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

