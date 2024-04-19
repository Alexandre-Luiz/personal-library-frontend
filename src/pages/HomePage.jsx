import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/home_bg4.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  };

  return (
    <div>
      {/* Background Image */}
      <div style={backgroundStyle} className="inset-0 filter blur-sm" />

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center flex-wrap">
        <div className="flex flex-col justify-center text-center border-2 bg-gray-50 bg-opacity-40 p-16 w-2/3 h-auto ">
          <h1 className="text-5xl text-black font-extrabold mb-8 flex justify-center">
            Welcome to Book Catalog
          </h1>
          <h3 className="mb-14 text-gray-900 text-center font-semibold break-words">
            Here you can manage your book collection the way you always wanted.
          </h3>
          <div className="flex justify-center space-x-4">
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
