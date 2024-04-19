import React from 'react';

export default function BookProgressBar({ totalPages, pagesRead }) {
  const progress = Math.round((pagesRead / totalPages) * 100);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-around text-left text-sm ">
        <span>Progress:</span>
        {progress === 100 ? (
          <p className="text-xs my-2 bg-gray-100 rounded-md p-1.5">Finished</p>
        ) : (
          <p className="text-xs my-2 bg-gray-100 rounded-lg p-1.5">{progress}%</p>
        )}
      </div>
      <div className="flex flex-row w-full justify-center items-center ">
        <div className=" w-2/3 h-3 bg-gray-300 rounded-full shadow-md">
          <div
            className="h-full rounded-full bg-blue-600 shadow-md"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
