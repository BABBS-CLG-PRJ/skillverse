import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Handle preflight requests (OPTIONS)
  if (request.method === 'OPTIONS') {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Max-Age', '86400'); // Cache preflight for 1 day
    return new NextResponse(null, { status: 204 }); // No Content for OPTIONS
  }

  // Add CORS headers for actual requests
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
