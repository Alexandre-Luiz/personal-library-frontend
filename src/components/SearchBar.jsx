import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearch() {
    onSearch(searchQuery);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="flex flex-row justify-between mx-auto py-4 px-2 w-2/3">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search for a book name or author"
          className="block w-full py-2 pl-5 pr-4 text-gray-700 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="absolute inset-y-0 right-0 flex items-center">
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
