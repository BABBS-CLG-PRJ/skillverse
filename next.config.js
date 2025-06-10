/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['res.cloudinary.com', 'robohash.org','media.istockphoto.com'],
  },
  typescript: {
    ignoreBuildErrors: true,  // Ignore TypeScript errors during the build process
  },
  crossOrigin: 'anonymous',
};
