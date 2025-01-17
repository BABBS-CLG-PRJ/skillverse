/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['res.cloudinary.com', 'robohash.org'],
  },
  typescript: {
    ignoreBuildErrors: true,  // Ignore TypeScript errors during the build process
  },
};
