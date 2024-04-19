import { useEffect, useState } from 'react';

export default function Filters({ allUserBooks, onFilter, sideBarStatus }) {
  const [filters, setFilters] = useState({
    finished: false,
    inProgress: false,
    favorite: false,
    author: '',
    publisher: '',
    year: '',
  });

  // const memorizedOnFilter = useCallback(onFilter, []);
  useEffect(() => {
    onFilter(filters);
    // memorizedOnFilter(filters);
  }, [filters]);

  function handleChangeFinishedCheckBox() {
    setFilters((prevState) => ({
      ...prevState,
      finished: !prevState.finished,
    }));
  }

  function handleChangeInProgressCheckBox() {
    setFilters((prevState) => ({
      ...prevState,
      inProgress: !prevState.inProgress,
    }));
  }

  function handleChangeFavoriteCheckBox() {
    setFilters((prevState) => ({
      ...prevState,
      favorite: !prevState.favorite,
    }));
  }

  function handleSelectedAuthor(event) {
    const newAuthorSelected = event.target.value;
    setFilters((prevState) => ({
      ...prevState,
      author: newAuthorSelected,
    }));
  }

  function handleSelectedPublisher(event) {
    const newPublisherSelected = event.target.value;
    setFilters((prevState) => ({
      ...prevState,
      publisher: newPublisherSelected,
    }));
  }

  function handleSelectedYear(event) {
    // need to convert to number so it can be compared when filtering
    const newYearSelected = +event.target.value;
    setFilters((prevState) => ({
      ...prevState,
      year: newYearSelected,
    }));
  }

  // Converting to set so it removes duplicates to build options and sorting
  const uniqueAuthors = [...new Set(allUserBooks.map((book) => book.author.toUpperCase()))].sort();
  const uniquePublishers = [
    ...new Set(allUserBooks.map((book) => book.publisher.toUpperCase())),
  ].sort();
  const uniqueYears = [...new Set(allUserBooks.map((book) => book.year))].sort();

  function handleClearFilters() {
    setFilters({
      finished: false,
      inProgress: false,
      favorite: false,
      author: '',
      publisher: '',
      year: '',
    });
  }

  return (
    <div className={`${sideBarStatus ? 'hidden' : 'mx-auto py-4 px-2 w-full'}`}>
      <div className="relative w-full flex flex-col justify-between items-center align-middle">
        <div className="mb-4 relative w-full flex flex-col justify-around items-start align-middle">
          <label className="flex items-center font-medium" htmlFor="finished-filter">
            <input
              className="mr-1 w-4 h-4"
              type="checkbox"
              id="finished-filter"
              checked={filters.finished}
              onChange={handleChangeFinishedCheckBox}
            />
            Finished
          </label>
          <label className="flex items-center font-light " htmlFor="in-progress-filter">
            <input
              className="mr-1 w-4 h-4"
              type="checkbox"
              id="in-progress-filter"
              checked={filters.inProgress}
              onChange={handleChangeInProgressCheckBox}
            />
            In progress
          </label>
          <label className="flex items-center font-medium" htmlFor="favorite-filter">
            <input
              className="mr-1 w-4 h-4"
              type="checkbox"
              id="favorite-filter"
              checked={filters.favorite}
              onChange={handleChangeFavoriteCheckBox}
            />
            Favorites
          </label>
        </div>
        <div className="relative w-full flex flex-col gap-10 justify-center items-start align-middle">
          {/* Author select */}
          <div className="w-full pr-2">
            <label
              htmlFor="author-filter"
              className="block mb-2 font-medium text-gray-900 dark:text-white"
            >
              <select
                id="author-filter"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={filters.author}
                onChange={handleSelectedAuthor}
              >
                <option value={''}>Select an author</option>
                {uniqueAuthors.map((author, i) => {
                  return <option key={i}>{author}</option>;
                })}
              </select>
            </label>
          </div>
          {/* Publisher select */}
          <div className="w-full pr-2">
            <label
              htmlFor="publisher-filter"
              className="block mb-2 font-medium text-gray-900 dark:text-white"
            >
              <select
                id="publisher-filter"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={filters.publisher}
                onChange={handleSelectedPublisher}
              >
                <option value={''}>Select a publisher</option>
                {uniquePublishers.map((publisher, i) => {
                  return <option key={i}>{publisher}</option>;
                })}
              </select>
            </label>
          </div>
          {/* Year select */}
          <div className="w-full pr-2">
            <label
              htmlFor="year-filter"
              className="block mb-2 font-medium text-gray-900 dark:text-white"
            >
              <select
                id="year-filter"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={filters.year}
                onChange={handleSelectedYear}
              >
                <option value={''}>Select a year</option>
                {uniqueYears.map((year, i) => {
                  return <option key={i}>{year}</option>;
                })}
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-start mt-3">
        <button
          onClick={handleClearFilters}
          type="button"
          className="hover:shadow-lg text-white font-bold bg-red-300 hover:bg-red-700 focus:ring-2 focus:ring-blue-300 rounded-lg text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
