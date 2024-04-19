import React from 'react';
import UserMenu from './UserMenu';

export default function Header({
  children = 'Use the children prop to define a value for the header component',
}) {
  return (
    <header className="bg-gray-900 w-full shadow-lg">
      <div className=" flex flex-row justify-between mx-auto py-4 px-4 w-full ">
        <div className="flex flex-row align-middle items-center">
          <img
            className="mr-2"
            src={process.env.PUBLIC_URL + '/logo.png'}
            style={{ width: 30, height: 'auto', maxHeight: 30 }}
            alt="book-logo"
          />
          <h1 className="text-left font-semibold text-4xl text-white flex items-center">
            {children}
          </h1>
        </div>
        <UserMenu />
      </div>
    </header>
  );
}
